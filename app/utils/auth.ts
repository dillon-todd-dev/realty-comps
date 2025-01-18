import NextAuth from 'next-auth';
import Nodemailer from 'next-auth/providers/nodemailer';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/app/utils/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log('next-auth user', user);
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });
      console.log('existingUser', existingUser);

      if (!existingUser || !existingUser.isActive) {
        console.log('RETURNING FALSE');
        return false;
      }

      console.log('RETURNING TRUE');
      return true;
    },
  },
  pages: {
    verifyRequest: '/verify',
  },
});
