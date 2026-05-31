'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function updateLeadStatus(leadId: string, newStatus: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: newStatus },
  });

  await prisma.leadActivity.create({
    data: {
      leadId,
      action: `Status changed to ${newStatus}`,
      userId: (session.user as any)?.id,
    }
  });

  revalidatePath('/admin/leads');
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath('/admin');
  return { success: true };
}

export async function saveLeadNote(leadId: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.leadNote.create({
    data: {
      leadId,
      content,
    }
  });

  revalidatePath(`/admin/leads/${leadId}`);
  return { success: true };
}

export async function updateLeadValue(leadId: string, dealValue: number, finalValue: number) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.lead.update({
    where: { id: leadId },
    data: { dealValue, finalValue },
  });

  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath('/admin');
  return { success: true };
}
