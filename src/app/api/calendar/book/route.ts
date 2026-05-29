import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { addMinutes, parseISO } from 'date-fns';
import { prisma } from '@/lib/prisma';

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
    await prisma.lead.create({
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
        status: 'NEW',
        remindersSent: 0,
      }
    });

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
