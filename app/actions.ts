'use server';

import { signIn, signOut } from '@/app/utils/auth';
import { loginSchema } from './utils/schema';
import { parseWithZod } from '@conform-to/zod';

export const login = async (formData: FormData) => {
  const submission = parseWithZod(formData, { schema: loginSchema });
  if (submission.status !== 'success') {
    return submission.reply();
  }

  await signIn('nodemailer', formData);
};

export const logout = async () => {
  await signOut();
};
