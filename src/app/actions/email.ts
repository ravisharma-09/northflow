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
