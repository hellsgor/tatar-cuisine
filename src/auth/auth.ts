import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/helpers/prisma';
import { ZodError } from 'zod';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from '@/schema/zod';
import { getUserFromDb } from '@/helpers/db';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 3600,
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error('Email и пароль обязательны');
          }

          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const user = await getUserFromDb(email);
          const isPasswordValid = await bcrypt.compare(
            password,
            `${user?.password}`,
          );
          if (!user || !isPasswordValid) {
            throw new Error('Неверный ввод данных');
          }

          return { id: user.id, email: user.email };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
});
