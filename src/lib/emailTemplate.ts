/**
 * NorthFlow — Premium Branded Email Template
 * 
 * All outgoing emails are wrapped in this shell for consistent branding.
 * Uses only inline CSS for maximum email client compatibility.
 */

const BRAND_COLOR = '#000000';
const BRAND_BG = '#F9F9F8';
const TEXT_PRIMARY = '#111111';
const TEXT_SECONDARY = '#555555';
const BORDER_COLOR = '#E5E5E5';

/**
 * Wraps email body content in a branded NorthFlow HTML template.
 */
export function buildEmail({
  preheader = '',
  heading,
  body,
  ctaText,
  ctaUrl,
  footerNote,
}: {
  preheader?: string;
  heading: string;
  body: string;
  ctaText?: string;
  ctaUrl?: string;
  footerNote?: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${heading}</title>
  <!--[if mso]>
  <style>table,td,div,p,span{font-family:Arial,sans-serif !important;}</style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${BRAND_BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}</div>` : ''}

  <!-- Outer Container -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND_BG};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        
        <!-- Inner Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          
          <!-- Header Bar -->
          <tr>
            <td style="background-color:${BRAND_COLOR};padding:28px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#FFFFFF;width:32px;height:32px;border-radius:50%;text-align:center;vertical-align:middle;">
                          <span style="color:${BRAND_COLOR};font-weight:800;font-size:16px;line-height:32px;">N</span>
                        </td>
                        <td style="padding-left:12px;">
                          <span style="color:#FFFFFF;font-weight:700;font-size:18px;letter-spacing:-0.3px;">NorthFlow</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Area -->
          <tr>
            <td style="padding:40px 40px 32px 40px;">
              <h1 style="margin:0 0 24px 0;font-size:24px;font-weight:800;color:${TEXT_PRIMARY};line-height:1.3;letter-spacing:-0.5px;">
                ${heading}
              </h1>
              <div style="font-size:15px;line-height:1.7;color:${TEXT_SECONDARY};">
                ${body}
              </div>
            </td>
          </tr>

          ${ctaText && ctaUrl ? `
          <!-- CTA Button -->
          <tr>
            <td style="padding:0 40px 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:${BRAND_COLOR};border-radius:50px;text-align:center;">
                    <a href="${ctaUrl}" target="_blank" style="display:inline-block;padding:16px 36px;color:#FFFFFF;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:-0.2px;">
                      ${ctaText}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background-color:${BORDER_COLOR};"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px 40px;">
              ${footerNote ? `<p style="margin:0 0 16px 0;font-size:13px;color:${TEXT_SECONDARY};line-height:1.6;">${footerNote}</p>` : ''}
              <p style="margin:0;font-size:12px;color:#999999;line-height:1.5;">
                © ${new Date().getFullYear()} NorthFlow · Remote · Worldwide<br/>
                <a href="mailto:northflow.work@gmail.com" style="color:#999999;text-decoration:underline;">northflow.work@gmail.com</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Formats a Date to a human-readable string in a specific timezone.
 * Defaults to Asia/Kolkata for all admin/business-facing times.
 */
export function formatTimeIST(date: Date, options?: { includeDate?: boolean }): string {
  const includeDate = options?.includeDate ?? true;
  
  if (includeDate) {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    }).format(date);
  }
  
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/**
 * Formats a Date for a specific client timezone (used in client-facing emails).
 */
export function formatTimeForClient(date: Date, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    }).format(date);
  } catch {
    // Fallback to IST if the timezone is invalid
    return formatTimeIST(date);
  }
}
