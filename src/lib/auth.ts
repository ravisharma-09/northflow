import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // We need authorization to be offline so we get a refresh token if needed, 
      // but next-auth handles it for login. The Calendar API still uses the manual refresh token.
    }),
  ],
  session: {
    strategy: 'jwt', // Required for edge runtimes or middleware
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Find role in DB
        const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
    async signIn({ user }) {
      // Security: Only allow specific emails to log in
      const allowedEmails = [
        process.env.GOOGLE_CALENDAR_ID, // Founder's email
        // Add other team members here later
      ];
      if (user.email && allowedEmails.includes(user.email)) {
        return true;
      }
      return false; // Block unauthorized emails
    }
  },
  pages: {
    signIn: '/login', // We will build a custom login page
  },
};
