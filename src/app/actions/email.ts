'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import nodemailer from 'nodemailer';
import { revalidatePath } from 'next/cache';

const getTransporter = () => {
  if (!process.env.GMAIL_APP_PASSWORD) throw new Error("Gmail App Password not configured");
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_CALENDAR_ID,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

export async function sendCustomEmail(leadId: string, subject: string, body: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) throw new Error("Lead not found");

  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"NorthFlow" <${process.env.GOOGLE_CALENDAR_ID}>`,
    to: lead.email,
    subject,
    html: `
      <div style="font-family: sans-serif; padding: 30px; max-width: 600px; color: #333; line-height: 1.6;">
        ${body.replace(/\\n/g, '<br/>')}
      </div>
    `
  });

  await prisma.leadActivity.create({
    data: {
      leadId,
      action: `Sent email: "${subject}"`,
      userId: (session.user as any)?.id,
    }
  });

  revalidatePath(`/admin/leads/${leadId}`);
  return { success: true };
}

export async function saveTemplate(name: string, subject: string, body: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.emailTemplate.upsert({
    where: { name },
    update: { subject, body },
    create: { name, subject, body }
  });

  revalidatePath('/admin/emails');
  return { success: true };
}

export async function deleteTemplate(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.emailTemplate.delete({ where: { id } });
  revalidatePath('/admin/emails');
  return { success: true };
}

export async function updateTemplate(id: string, name: string, subject: string, body: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.emailTemplate.update({
    where: { id },
    data: { name, subject, body }
  });

  revalidatePath('/admin/emails');
  return { success: true };
}

export async function sendTemplateToLeads(templateId: string, leadIds: string[]) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const template = await prisma.emailTemplate.findUnique({ where: { id: templateId } });
  if (!template) throw new Error("Template not found");

  const leads = await prisma.lead.findMany({ where: { id: { in: leadIds } } });
  const transporter = getTransporter();

  for (const lead of leads) {
    // Replace placeholders (supports both {{name}} and [Name] syntaxes)
    const subject = template.subject
      .replace(/\{\{name\}\}|\[Name\]/gi, lead.name)
      .replace(/\{\{businessName\}\}|\[Company\]/gi, lead.businessName || 'your company')
      .replace(/\{\{services\}\}/gi, lead.services || '');

    const body = template.body
      .replace(/\{\{name\}\}|\[Name\]/gi, lead.name)
      .replace(/\{\{businessName\}\}|\[Company\]/gi, lead.businessName || 'your company')
      .replace(/\{\{services\}\}/gi, lead.services || '')
      .replace(/\{\{meetLink\}\}|\[MeetLink\]/gi, lead.meetLink || 'N/A')
      .replace(/\[Time\]/gi, 'your scheduled time');

    await transporter.sendMail({
      from: `"NorthFlow" <${process.env.GOOGLE_CALENDAR_ID}>`,
      to: lead.email,
      subject,
      html: `
        <div style="font-family: sans-serif; padding: 30px; max-width: 600px; color: #333; line-height: 1.6;">
          ${body.replace(/\\n/g, '<br/>')}
        </div>
      `
    });

    await prisma.leadActivity.create({
      data: {
        leadId: lead.id,
        action: `Sent template: "${template.name}"`,
        userId: (session.user as any)?.id,
      }
    });
  }

  revalidatePath('/admin/emails');
  return { success: true };
}
