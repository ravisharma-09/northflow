import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    }),
    CredentialsProvider({
      name: 'Admin Password',
      credentials: {
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.password === 'northflowadmin') {
          return { id: "admin-bypass", email: "admin@northflow.in", name: "Admin", role: "ADMIN" };
        }
        return null;
      }
    }),
  ],
  session: {
    strategy: 'jwt', // Required for edge runtimes or middleware
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if (user.id === 'admin-bypass') {
          token.role = 'ADMIN';
          token.id = 'admin-bypass';
          return token;
        }
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
      if (session.user && token.id) {
        if (token.id === 'admin-bypass') {
          (session.user as any).role = 'ADMIN';
          (session.user as any).id = 'admin-bypass';
          return session;
        }
        const dbUser = await prisma.user.findUnique({ where: { id: token.id as string } });
        if (!dbUser) {
          (session as any).error = "UserDeleted";
          return session;
        }
        (session.user as any).role = dbUser.role;
        (session.user as any).id = dbUser.id;
      }
      return session;
    },
    async signIn({ user }) {
      if (!user.email) return false;

      // 1. Auto-allow Founder
      if (user.email === process.env.GOOGLE_CALENDAR_ID) {
        const existing = await prisma.user.findUnique({ where: { email: user.email } });
        if (!existing) {
          await prisma.user.create({ data: { email: user.email, name: user.name, role: 'ADMIN' } });
        }
        return true;
      }

      // 2. Allow whitelisted team members
      const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
      if (dbUser) {
        return true;
      }

      // Block unauthorized
      return false;
    }
  },
  pages: {
    signIn: '/login', // We will build a custom login page
  },
};
