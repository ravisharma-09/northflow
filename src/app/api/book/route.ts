import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // The data expected from the form
    const { 
      name, 
      email, 
      whatsapp, 
      businessName, 
      services, 
      timeline, 
      budget, 
      message 
    } = body;

    // TODO: Connect your actual Database here (e.g. Supabase, Prisma)
    console.log('--- NEW BOOKING RECEIVED ---');
    console.table({ name, email, whatsapp, businessName, timeline, budget, message });
    console.log('Services:', services);
    
    // Simulate a network delay for DB insert / Email sending
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // TODO: Trigger email notification here (e.g. Resend, Sendgrid)
    
    return NextResponse.json({ success: true, message: 'Booking received successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
