import { db } from '@/server/db';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { v4 as uuid } from 'uuid';

const adapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async ({ email, password }) => {
        const existingUser = await db.user.findUnique({
          where: { email: email as string },
        });
        if (!existingUser || !existingUser.isActive) {
          throw new Error('Invalid credentials.');
        }

        const passwordMatch = await compare(
          password as string,
          existingUser.password,
        );
        if (!passwordMatch) {
          throw new Error('Invalid credentials.');
        }
        return existingUser;
      },
    }),
  ],
  jwt: {
    encode: async (params) => {
      const sessionToken = uuid();
      if (!params.token?.sub) {
        throw new Error('No user ID found in token');
      }

      const createdSession = await adapter?.createSession?.({
        sessionToken,
        userId: params.token.sub,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      if (!createdSession) {
        throw new Error('Failed to create session');
      }

      return sessionToken;
    },
  },
});
