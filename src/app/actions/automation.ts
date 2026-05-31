'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function createAutomationRule(name: string, triggerValue: string, templateId: string) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== 'ADMIN') throw new Error("Unauthorized");

  await prisma.automationRule.create({
    data: {
      name,
      triggerType: 'STATUS_CHANGED',
      triggerValue,
      actionType: 'SEND_EMAIL',
      templateId,
    }
  });

  revalidatePath('/admin/automations');
  return { success: true };
}

export async function deleteAutomationRule(id: string) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== 'ADMIN') throw new Error("Unauthorized");

  await prisma.automationRule.delete({ where: { id } });
  revalidatePath('/admin/automations');
  return { success: true };
}
