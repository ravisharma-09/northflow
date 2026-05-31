import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { addMinutes, parseISO, format } from 'date-fns';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, businessName, services, message, slot } = body;

    if (!slot || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const startDateTime = parseISO(slot);
    const endDateTime = addMinutes(startDateTime, 45); // 45 min meeting

    // If no Google credentials, return MOCK success so the UI can be previewed!
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN) {
      console.warn("⚠️ NO GOOGLE OAUTH CREDENTIALS FOUND. Simulating successful booking.");
      await new Promise(r => setTimeout(r, 1000));
      return NextResponse.json({ 
        success: true, 
        meetLink: 'https://meet.google.com/mock-link-123'
      });
    }

    // 1. Initialize Google Auth with OAuth2
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const calendar = google.calendar({ version: 'v3', auth });

    // 2. Create the Event with Google Meet link and Attendees
    const event = {
      summary: `Discovery Call: ${businessName || name} x NorthFlow`,
      description: `
        Name: ${name}
        Email: ${email}
        WhatsApp: ${whatsapp || 'N/A'}
        Business: ${businessName || 'N/A'}
        Services: ${services?.join(', ') || 'N/A'}
        Message: ${message || 'N/A'}
      `,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'UTC',
      },
      attendees: [
        { email: email } // Since we use OAuth, we CAN invite attendees securely!
      ],
      conferenceData: {
        createRequest: {
          requestId: `northflow-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      conferenceDataVersion: 1, // Required to create Google Meet links
      sendUpdates: 'all', // Instructs Google to send the official email invite!
      requestBody: event,
    });

    // Save to our new Prisma Database!
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
        status: 'New',
        remindersSent: 0,
      }
    });

    // Send Immediate Confirmation Emails
    if (process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GOOGLE_CALENDAR_ID,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const formattedTime = format(startDateTime, 'EEEE, MMMM d, yyyy @ h:mm a');

      // 1. Email to Client
      await transporter.sendMail({
        from: `"NorthFlow" <${process.env.GOOGLE_CALENDAR_ID}>`,
        to: email,
        subject: `Confirmed: Discovery Call with NorthFlow`,
        html: `
          <div style="font-family: sans-serif; padding: 30px; color: #333; line-height: 1.6;">
            <h2>Hi ${name},</h2>
            <p>Your discovery call is confirmed for <strong>${formattedTime}</strong>.</p>
            ${response.data.hangoutLink ? `
              <div style="margin: 30px 0;">
                <a href="${response.data.hangoutLink}" style="background: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold;">Join Google Meet</a>
              </div>
            ` : ''}
            <p>We look forward to speaking with you!</p>
            <p>- NorthFlow Team</p>
          </div>
        `
      }).catch(console.error);

      // 2. Email to Admin/Team
      await transporter.sendMail({
        from: `"NorthFlow CRM" <${process.env.GOOGLE_CALENDAR_ID}>`,
        to: process.env.GOOGLE_CALENDAR_ID, // Send to founder
        subject: `🎉 NEW BOOKING: ${name} (${businessName || 'No Company'})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2>New Discovery Call Booked!</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp || 'N/A'}</p>
            <p><strong>Company:</strong> ${businessName || 'N/A'}</p>
            <p><strong>Services:</strong> ${services?.join(', ') || 'N/A'}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Message:</strong> ${message || 'N/A'}</p>
            <div style="margin-top: 20px;">
              <a href="${process.env.NEXTAUTH_URL}/admin/leads/${newLead.id}" style="background: #0070f3; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in CRM</a>
            </div>
          </div>
        `
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
