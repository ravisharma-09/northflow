import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { differenceInMinutes } from 'date-fns';
import { buildEmail, formatTimeForClient, formatTimeIST } from '@/lib/emailTemplate';

export async function GET(request: Request) {
  // Security: Prevent random people from triggering this endpoint in production
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.GMAIL_APP_PASSWORD) {
    return NextResponse.json({ error: 'Gmail App Password not configured in .env.local' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_CALENDAR_ID,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    // Find all upcoming meetings that haven't had all reminders sent
    const upcomingLeads = await prisma.lead.findMany({
      where: {
        meetingStart: { gt: new Date() },
        remindersSent: { lt: 3 },
        status: { notIn: ['Lost'] }
      }
    });

    let emailsSent = 0;

    for (const lead of upcomingLeads) {
      const minutesUntilMeeting = differenceInMinutes(new Date(lead.meetingStart), new Date());

      let shouldSend = false;
      let emailType = '';
      let newReminderState = lead.remindersSent;
      let urgencyEmoji = '📅';

      // 24 Hour Reminder
      if (minutesUntilMeeting <= 1440 && minutesUntilMeeting > 60 && lead.remindersSent === 0) {
        shouldSend = true;
        emailType = '24 Hours';
        newReminderState = 1;
        urgencyEmoji = '📅';
      }
      // 1 Hour Reminder
      else if (minutesUntilMeeting <= 60 && minutesUntilMeeting > 15 && lead.remindersSent < 2) {
        shouldSend = true;
        emailType = '1 Hour';
        newReminderState = 2;
        urgencyEmoji = '⏰';
      }
      // 15 Minute Reminder
      else if (minutesUntilMeeting <= 15 && minutesUntilMeeting > 0 && lead.remindersSent < 3) {
        shouldSend = true;
        emailType = '15 Minutes';
        newReminderState = 3;
        urgencyEmoji = '🔔';
      }

      if (shouldSend) {
        const clientTz = lead.timezone || 'Asia/Kolkata';
        const formattedTime = formatTimeForClient(new Date(lead.meetingStart), clientTz);

        const reminderHtml = buildEmail({
          preheader: `Your discovery call with NorthFlow starts in ${emailType}`,
          heading: `${urgencyEmoji} Your Call Starts in ${emailType}`,
          body: `
            <p style="margin:0 0 16px 0;font-size:16px;color:#111111;">Hi <strong>${lead.name}</strong>,</p>
            <p style="margin:0 0 20px 0;">Just a friendly reminder that your discovery call with NorthFlow is coming up soon.</p>
            
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5;border-radius:12px;margin:0 0 24px 0;">
              <tr>
                <td style="padding:24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:0 0 12px 0;">
                        <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#888888;">📅 Meeting Details</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 8px 0;">
                        <span style="font-size:15px;font-weight:600;color:#111111;">${formattedTime}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span style="font-size:14px;color:#555555;">Duration: 45 minutes · Google Meet</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px 0;font-size:14px;color:#555555;">We're looking forward to chatting about your business!</p>
            ${lead.meetLink ? `<p style="margin:16px 0 0 0;font-size:13px;color:#888888;">Direct link: <a href="${lead.meetLink}" style="color:#111111;">${lead.meetLink}</a></p>` : ''}
          `,
          ctaText: lead.meetLink ? 'Join Google Meet →' : undefined,
          ctaUrl: lead.meetLink || undefined,
          footerNote: 'If you need to reschedule, simply reply to this email.',
        });

        await transporter.sendMail({
          from: `"NorthFlow" <${process.env.GOOGLE_CALENDAR_ID}>`,
          to: lead.email,
          subject: `${urgencyEmoji} Reminder: Discovery Call in ${emailType} — NorthFlow`,
          html: reminderHtml,
        });

        // Update database so we don't send this reminder again
        await prisma.lead.update({
          where: { id: lead.id },
          data: { remindersSent: newReminderState }
        });
        
        emailsSent++;
      }
    }

    return NextResponse.json({ success: true, processed: upcomingLeads.length, emailsSent });
  } catch (error: any) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
