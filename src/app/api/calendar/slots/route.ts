import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { addDays, setHours, setMinutes, startOfDay, isBefore, isAfter, formatISO, addMinutes } from 'date-fns';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date'); // e.g., '2026-06-01'
  
  if (!dateParam) {
    return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
  }

  const requestedDate = startOfDay(new Date(dateParam));

  // If no Google credentials, return MOCK data so the UI can be previewed!
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.warn("⚠️ NO GOOGLE SERVICE ACCOUNT CREDENTIALS FOUND. Returning mock available slots for UI preview.");
    
    // Generate some mock slots from 11am to midnight (24:00)
    const mockSlots = [];
    for (let hour = 11; hour < 24; hour++) {
      mockSlots.push(formatISO(setMinutes(setHours(requestedDate, hour), 0)));
    }

    // Randomly remove some slots to make it look realistic
    const realisticSlots = mockSlots.filter(() => Math.random() > 0.3);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));
    
    return NextResponse.json({ slots: realisticSlots });
  }

  try {
    // 1. Initialize Google Auth with Service Account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle escaped newlines from Vercel env
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // 2. Define the working hours (11 AM to 12 AM / Midnight)
    const workStart = setHours(requestedDate, 11);
    const workEnd = setHours(requestedDate, 24); // 24:00 is midnight

    // 3. Fetch busy periods from Google Calendar for the requested date
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: workStart.toISOString(),
        timeMax: workEnd.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID || 'primary' }],
      },
    });

    const busyPeriods = response.data.calendars?.[process.env.GOOGLE_CALENDAR_ID || 'primary']?.busy || [];

    // 4. Calculate available 45-min slots with 15-min breaks
    const availableSlots = [];
    let currentSlot = workStart;

    while (isBefore(currentSlot, workEnd)) {
      const slotEnd = addMinutes(currentSlot, 45); // 45 minute meeting
      
      if (isAfter(slotEnd, workEnd)) break; // Don't schedule past midnight
      
      // Check if this slot overlaps with any busy period
      const isBusy = busyPeriods.some(busy => {
        const busyStart = new Date(busy.start!);
        const busyEnd = new Date(busy.end!);
        // Overlap condition
        return currentSlot < busyEnd && slotEnd > busyStart;
      });

      if (!isBusy) {
        availableSlots.push(formatISO(currentSlot));
      }

      // Move to next slot: 45 min meeting + 15 min break = 60 mins total
      currentSlot = addMinutes(currentSlot, 60);
    }

    return NextResponse.json({ slots: availableSlots });
  } catch (error) {
    console.error('Error fetching calendar slots:', error);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
