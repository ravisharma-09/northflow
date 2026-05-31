'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function inviteTeamMember(email: string, role: string) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== 'ADMIN') throw new Error("Unauthorized");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("User is already in the team");
  }

  await prisma.user.create({
    data: {
      email,
      role, // 'ADMIN' or 'MEMBER'
    }
  });

  revalidatePath('/admin/team');
  return { success: true };
}

export async function removeTeamMember(id: string) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== 'ADMIN') throw new Error("Unauthorized");

  // Prevent founder from deleting themselves
  const userToDelete = await prisma.user.findUnique({ where: { id } });
  if (userToDelete?.email === process.env.GOOGLE_CALENDAR_ID) {
    throw new Error("Cannot remove the primary founder account");
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath('/admin/team');
  return { success: true };
}
