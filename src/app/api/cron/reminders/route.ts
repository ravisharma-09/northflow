import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { differenceInHours } from 'date-fns';

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
      user: process.env.GOOGLE_CALENDAR_ID, // Use their email address
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    // Find all upcoming meetings that haven't had both reminders sent
    const upcomingLeads = await prisma.lead.findMany({
      where: {
        meetingStart: { gt: new Date() },
        remindersSent: { lt: 2 },
        status: { not: 'CLOSED' }
      }
    });

    let emailsSent = 0;

    for (const lead of upcomingLeads) {
      const hoursUntilMeeting = differenceInHours(new Date(lead.meetingStart), new Date());

      let shouldSend = false;
      let emailType = '';
      let newReminderState = lead.remindersSent;

      // 24 Hour Reminder (Trigger if meeting is 1-24 hours away and we haven't sent anything)
      if (hoursUntilMeeting <= 24 && hoursUntilMeeting > 1 && lead.remindersSent === 0) {
        shouldSend = true;
        emailType = '24 Hours';
        newReminderState = 1;
      }
      // 1 Hour Reminder (Trigger if meeting is <= 1 hour away)
      else if (hoursUntilMeeting <= 1 && lead.remindersSent < 2) {
        shouldSend = true;
        emailType = '1 Hour';
        newReminderState = 2;
      }

      if (shouldSend) {
        await transporter.sendMail({
          from: `"NorthFlow" <${process.env.GOOGLE_CALENDAR_ID}>`,
          to: lead.email,
          subject: `Reminder: Discovery Call in ${emailType} - NorthFlow`,
          html: `
            <div style="font-family: sans-serif; padding: 30px; max-width: 600px; color: #333; line-height: 1.6;">
              <h2 style="color: #000;">Hi ${lead.name},</h2>
              <p>Just a quick reminder that your discovery call with NorthFlow starts in <strong>${emailType}</strong>.</p>
              ${lead.meetLink ? `
              <div style="margin: 30px 0;">
                <a href="${lead.meetLink}" style="background: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Join Google Meet</a>
              </div>
              <p style="font-size: 14px; color: #666;">Or copy this link: <a href="${lead.meetLink}">${lead.meetLink}</a></p>
              ` : ''}
              <p>Looking forward to chatting about your business!</p>
              <p>Best regards,<br/><strong>Ravi Sharma</strong><br/>NorthFlow</p>
            </div>
          `
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
