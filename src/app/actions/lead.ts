'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { google } from 'googleapis';
import { addMinutes } from 'date-fns';
import { sendTemplateToLeads } from './email';

export async function updateLeadStatus(leadId: string, newStatus: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: newStatus },
  });

  await prisma.leadActivity.create({
    data: {
      leadId,
      action: `Status changed to ${newStatus}`,
      userId: (session.user as any)?.id,
    }
  });

  // --- AUTOMATION WORKFLOW HOOK ---
  const matchingRules = await prisma.automationRule.findMany({
    where: {
      isActive: true,
      triggerType: 'STATUS_CHANGED',
      triggerValue: newStatus
    }
  });

  if (matchingRules.length > 0) {
    for (const rule of matchingRules) {
      if (rule.actionType === 'SEND_EMAIL' && rule.templateId) {
        try {
          await sendTemplateToLeads(rule.templateId, [leadId]);
        } catch (e) {
          console.error(`Automation Rule ${rule.name} failed:`, e);
        }
      }
    }
  }
  // --------------------------------

  revalidatePath('/admin/leads');
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath('/admin');
  return { success: true };
}

export async function saveLeadNote(leadId: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.leadNote.create({
    data: {
      leadId,
      content,
    }
  });

  revalidatePath('/admin/leads/[id]', 'page');
  return { success: true };
}

// ---- BOOKING ACTIONS ----

function getGoogleCalendarAuth() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return google.calendar({ version: 'v3', auth });
}

export async function cancelBooking(leadId: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead || !lead.eventId) throw new Error("No booking found");

  if (process.env.GOOGLE_CLIENT_ID) {
    try {
      const calendar = getGoogleCalendarAuth();
      await calendar.events.delete({
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        eventId: lead.eventId,
        sendUpdates: 'all' // notifies client of cancellation
      });
    } catch (e) {
      console.error("Failed to delete from GCal", e);
    }
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: 'Lost', meetLink: '', eventId: '' }
  });

  await prisma.leadActivity.create({
    data: {
      leadId,
      action: `Cancelled booking & removed from Calendar`,
      userId: (session.user as any)?.id,
    }
  });

  revalidatePath('/admin/bookings');
  return { success: true };
}

export async function rescheduleBooking(leadId: string, newStartIso: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead || !lead.eventId) throw new Error("No booking found");

  const newStart = new Date(newStartIso);
  const newEnd = addMinutes(newStart, 45);

  if (process.env.GOOGLE_CLIENT_ID) {
    try {
      const calendar = getGoogleCalendarAuth();
      await calendar.events.patch({
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        eventId: lead.eventId,
        sendUpdates: 'all', // notifies client of reschedule
        requestBody: {
          start: { dateTime: newStart.toISOString(), timeZone: 'UTC' },
          end: { dateTime: newEnd.toISOString(), timeZone: 'UTC' }
        }
      });
    } catch (e) {
      console.error("Failed to patch GCal", e);
    }
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { 
      meetingStart: newStart, 
      meetingEnd: newEnd,
      remindersSent: 0 // reset reminders!
    }
  });

  await prisma.leadActivity.create({
    data: {
      leadId,
      action: `Rescheduled booking to new date/time`,
      userId: (session.user as any)?.id,
    }
  });

  revalidatePath('/admin/bookings');
  return { success: true };
}

export async function assignLead(leadId: string, userId: string | null) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const lead = await prisma.lead.update({
    where: { id: leadId },
    data: { assignedToId: userId }
  });

  let assigneeName = "Unassigned";

  if (userId) {
    const assignee = await prisma.user.findUnique({ where: { id: userId } });
    if (assignee) {
      assigneeName = assignee.name || assignee.email || 'Team Member';
      
      // Email the assignee!
      if (process.env.GMAIL_APP_PASSWORD && assignee.email) {
        try {
          const transporter = getGoogleCalendarAuth(); // wait, no, I need nodemailer here
          const mailer = require('nodemailer').createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GOOGLE_CALENDAR_ID,
              pass: process.env.GMAIL_APP_PASSWORD,
            },
          });

          await mailer.sendMail({
            from: `"NorthFlow CRM" <${process.env.GOOGLE_CALENDAR_ID}>`,
            to: assignee.email,
            subject: `🔔 New Lead Assigned: ${lead.name}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2>You have been assigned a new lead!</h2>
                <p><strong>Lead:</strong> ${lead.name}</p>
                <p><strong>Company:</strong> ${lead.businessName || 'N/A'}</p>
                <div style="margin-top: 20px;">
                  <a href="${process.env.NEXTAUTH_URL}/admin/leads/${lead.id}" style="background: #0070f3; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in CRM</a>
                </div>
              </div>
            `
          });
        } catch (e) {
          console.error("Failed to email assignee", e);
        }
      }
    }
  }

  await prisma.leadActivity.create({
    data: {
      leadId,
      action: `Lead assigned to ${assigneeName}`,
      userId: (session.user as any)?.id,
    }
  });

  revalidatePath('/admin/leads/[id]', 'page');
  return { success: true };
}

export async function updateLeadValue(leadId: string, dealValue: number, finalValue: number) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.lead.update({
    where: { id: leadId },
    data: { dealValue, finalValue },
  });

  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath('/admin');
  return { success: true };
}
