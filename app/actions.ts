'use server';

import { signIn, signOut } from '@/app/utils/auth';
import { redirect } from 'next/navigation';

export const login = async (formData: FormData) => {
  let error = false;

  try {
    await signIn('nodemailer', formData);
  } catch (error) {
    error = true;
  }

  if (error) {
    console.log('REDIRECTING TO ACCESS DENIED');
    redirect('/access-denied');
  }
};

export const logout = async () => {
  await signOut();
};
