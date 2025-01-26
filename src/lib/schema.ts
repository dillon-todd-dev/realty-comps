import { boolean, object, string } from 'zod';

const emailSchema = string({ required_error: 'Email is required' })
  .min(1, 'Email is required')
  .email('Invalid email');

const passwordSchema = string({ required_error: 'Password is required' }).min(
  1,
  'Password is required',
);

export const loginSchema = object({
  email: emailSchema,
  password: passwordSchema,
});

export const createUserSchema = object({
  firstName: string({ required_error: 'First Name is required' }).min(
    1,
    'First Name is required',
  ),
  lastName: string({ required_error: 'Last Name is required' }).min(
    1,
    'Last Name is required',
  ),
  email: emailSchema,
  password: passwordSchema.min(8, 'Password must be at least 8 characters'),
  isAdmin: boolean({ required_error: 'Is Admin is required' }),
  isActive: boolean({ required_error: 'Is Active is required' }),
});

export const updateUserSchema = object({
  firstName: string({ required_error: 'First Name is required' }).min(
    1,
    'First Name is required',
  ),
  lastName: string({ required_error: 'Last Name is required' }).min(
    1,
    'Last Name is required',
  ),
  email: emailSchema,
  isAdmin: boolean({ required_error: 'Is Admin is required' }),
  isActive: boolean({ required_error: 'Is Active is required' }),
});
