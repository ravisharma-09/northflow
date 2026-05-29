import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 });
  }

  const host = request.headers.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const redirectUri = `${protocol}://${host}/api/auth/google/callback`;

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    const html = `
      <html>
        <body style="font-family: sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; background: #000; color: #fff;">
          <h1 style="color: #10B981;">Authentication Successful! 🎉</h1>
          <p style="color: #a1a1aa; font-size: 16px;">
            You have successfully connected your Google Calendar. Please copy the Refresh Token below and paste it into your <code>.env.local</code> file.
          </p>
          
          <div style="background: #18181b; padding: 24px; border-radius: 12px; margin-top: 24px; word-break: break-all; border: 1px solid #27272a; position: relative;">
            <p style="margin-top: 0; color: #a1a1aa; font-family: monospace;">GOOGLE_REFRESH_TOKEN=</p>
            <p style="margin: 0; font-family: monospace; font-size: 14px; color: #fff;">
              ${tokens.refresh_token || '⚠️ NO REFRESH TOKEN RECEIVED (You may need to revoke access and try again)'}
            </p>
          </div>

          <p style="margin-top: 24px; color: #a1a1aa;">
            Once added to <code>.env.local</code>, restart your dev server and your custom booking system will be fully operational!
          </p>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    console.error('Error exchanging token:', error);
    return NextResponse.json({ error: 'Failed to exchange authorization code' }, { status: 500 });
  }
}
