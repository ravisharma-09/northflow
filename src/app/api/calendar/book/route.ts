import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { addMinutes, parseISO } from 'date-fns';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { buildEmail, formatTimeForClient, formatTimeIST } from '@/lib/emailTemplate';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, businessName, services, message, slot, clientTimeZone } = body;

    if (!slot || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const startDateTime = parseISO(slot);
    const endDateTime = addMinutes(startDateTime, 45); // 45 min meeting
    const tz = clientTimeZone || 'Asia/Kolkata';

    // If no Google credentials, return MOCK success so the UI can be previewed!
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.warn("⚠️ NO GOOGLE SERVICE ACCOUNT CREDENTIALS FOUND. Simulating successful booking.");
      await new Promise(r => setTimeout(r, 1000));
      return NextResponse.json({ 
        success: true, 
        meetLink: 'https://meet.google.com/mock-link-123'
      });
    }

    // 1. Initialize Google Auth with Service Account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle escaped newlines from Vercel env
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // 2. Create the Event with Google Meet link and Attendees
    const event = {
      summary: `Discovery Call: ${businessName || name} x NorthFlow`,
      description: `
        <h3>🚀 New Discovery Call Booked!</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>WhatsApp:</strong> ${whatsapp || 'N/A'}</p>
        <hr/>
        <p><strong>Business:</strong> ${businessName || 'N/A'}</p>
        <p><strong>Services Needed:</strong> ${services?.join(', ') || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message || 'N/A'}</p>
        <hr/>
        <p><i>Booked via NorthFlow CRM</i></p>
      `,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: tz,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: tz,
      },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      conferenceDataVersion: 1,
      sendUpdates: 'none', // ← STOP Google from sending its own duplicate email
      requestBody: event,
    });

    // Save to Prisma Database (now with timezone)
    const newLead = await prisma.lead.create({
      data: {
        name,
        email,
        whatsapp: whatsapp || '',
        businessName: businessName || '',
        services: services?.join(', ') || '',
        message: message || '',
        meetLink: response.data.hangoutLink || '',
        eventId: response.data.id || '',
        meetingStart: startDateTime,
        meetingEnd: endDateTime,
        timezone: tz,
        status: 'New',
        remindersSent: 0,
      }
    });

    // Send Styled Confirmation Emails
    if (process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GOOGLE_CALENDAR_ID,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const clientFormattedTime = formatTimeForClient(startDateTime, tz);
      const adminFormattedTime = formatTimeIST(startDateTime);

      // ─── Email to Client ───
      const clientEmailHtml = buildEmail({
        preheader: `Your discovery call with NorthFlow is confirmed for ${clientFormattedTime}`,
        heading: `Your Call is Confirmed! ✅`,
        body: `
          <p style="margin:0 0 16px 0;font-size:16px;color:#111111;">Hi <strong>${name}</strong>,</p>
          <p style="margin:0 0 20px 0;">Thank you for booking a discovery call with NorthFlow. We're excited to learn about your business and explore how we can help you grow.</p>
          
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
                      <span style="font-size:15px;font-weight:600;color:#111111;">${clientFormattedTime}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 8px 0;">
                      <span style="font-size:14px;color:#555555;">Duration: 45 minutes</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style="font-size:14px;color:#555555;">Platform: Google Meet</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <p style="margin:0 0 8px 0;font-size:14px;color:#555555;">Here's what to expect:</p>
          <ul style="margin:0 0 20px 0;padding-left:20px;color:#555555;font-size:14px;line-height:2;">
            <li>We'll discuss your business goals and challenges</li>
            <li>Explore how automation and systems can help</li>
            <li>Outline a tailored plan for your growth</li>
          </ul>
        `,
        ctaText: response.data.hangoutLink ? 'Join Google Meet →' : undefined,
        ctaUrl: response.data.hangoutLink || undefined,
        footerNote: 'If you need to reschedule, simply reply to this email and we\'ll find another time that works.',
      });

      await transporter.sendMail({
        from: `"NorthFlow" <${process.env.GOOGLE_CALENDAR_ID}>`,
        to: email,
        subject: `✅ Confirmed: Discovery Call with NorthFlow`,
        html: clientEmailHtml,
      }).catch(console.error);

      // ─── Email to Team ───
      const team = await prisma.user.findMany({ select: { email: true } });
      const teamEmails = team.map(u => u.email).filter(Boolean).join(',');

      const teamEmailHtml = buildEmail({
        preheader: `New booking from ${name} (${businessName || 'No company'})`,
        heading: `🎉 New Discovery Call Booked!`,
        body: `
          <p style="margin:0 0 20px 0;">A new lead has just booked a discovery call through the website.</p>
          
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5;border-radius:12px;margin:0 0 24px 0;">
            <tr>
              <td style="padding:24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:0 0 10px 0;border-bottom:1px solid #E5E5E5;">
                      <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#888888;">Lead Details</span>
                    </td>
                  </tr>
                  <tr><td style="padding:12px 0 6px 0;"><strong style="color:#111;">Name:</strong> <span style="color:#333;">${name}</span></td></tr>
                  <tr><td style="padding:6px 0;"><strong style="color:#111;">Email:</strong> <span style="color:#333;">${email}</span></td></tr>
                  <tr><td style="padding:6px 0;"><strong style="color:#111;">WhatsApp:</strong> <span style="color:#333;">${whatsapp || 'N/A'}</span></td></tr>
                  <tr><td style="padding:6px 0;"><strong style="color:#111;">Company:</strong> <span style="color:#333;">${businessName || 'N/A'}</span></td></tr>
                  <tr><td style="padding:6px 0;"><strong style="color:#111;">Services:</strong> <span style="color:#333;">${services?.join(', ') || 'N/A'}</span></td></tr>
                  <tr><td style="padding:6px 0;"><strong style="color:#111;">Time (IST):</strong> <span style="color:#333;">${adminFormattedTime}</span></td></tr>
                  ${message ? `<tr><td style="padding:6px 0;"><strong style="color:#111;">Message:</strong> <span style="color:#333;">${message}</span></td></tr>` : ''}
                </table>
              </td>
            </tr>
          </table>
        `,
        ctaText: 'View in CRM →',
        ctaUrl: `${process.env.NEXTAUTH_URL}/admin/leads/${newLead.id}`,
      });

      await transporter.sendMail({
        from: `"NorthFlow CRM" <${process.env.GOOGLE_CALENDAR_ID}>`,
        to: teamEmails || process.env.GOOGLE_CALENDAR_ID,
        subject: `🎉 NEW BOOKING: ${name} (${businessName || 'No Company'})`,
        html: teamEmailHtml,
      }).catch(console.error);
    }

    return NextResponse.json({ 
      success: true, 
      meetLink: response.data.hangoutLink,
      eventId: response.data.id
    });

  } catch (error: any) {
    console.error('Error creating calendar event via OAuth:', error);
    return NextResponse.json({ error: error.message || 'Failed to create booking' }, { status: 500 });
  }
}
