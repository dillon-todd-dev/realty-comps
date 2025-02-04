'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { authClient } from '@/lib/auth-client';
import { createUserSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { Input } from '@/components/ui/input';
import { FormMessage } from '@/components/ui/form';
import { api } from '@/trpc/react';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function NewUserForm() {
  const utils = api.useUtils();
  const router = useRouter();

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isAdmin: false,
      isActive: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
    await authClient.admin.createUser(
      {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
        role: values.isAdmin ? 'admin' : 'user',
        data: {
          banned: !values.isActive,
        },
      },
      {
        onSuccess: async () => {
          toast.success('User created successfully');
          form.reset();
          await utils.user.getUsers.invalidate();
          router.push('/users');
        },
        onError: () => {
          toast.error('Failed to create user');
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-dark-500 text-base font-normal'>
                First Name
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder='First Name'
                  {...field}
                  className='bg-light-600 !important min-h-14 border border-gray-100 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-dark-500 text-base font-normal'>
                Last Name
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder='Last Name'
                  {...field}
                  className='bg-light-600 !important min-h-14 border border-gray-100 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-dark-500 text-base font-normal'>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder='Email'
                  {...field}
                  className='bg-light-600 !important min-h-14 border border-gray-100 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel className='text-dark-500 text-base font-normal'>
                Password
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder='********'
                  type='password'
                  {...field}
                  className='bg-light-600 !important min-h-14 border border-gray-100 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-evenly'>
          <FormField
            control={form.control}
            name='isActive'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2'>
                <FormLabel className='text-dark-500 text-base font-normal'>
                  Active
                </FormLabel>
                <FormControl className='flex items-center justify-center'>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={field.disabled}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isAdmin'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2'>
                <FormLabel className='text-dark-500 text-base font-normal'>
                  Admin
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={field.disabled}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type='submit'
          className='bg-primary-dashboard hover:bg-primary-dashboard/95 !important min-h-14 w-full text-white'
        >
          Create User
        </Button>
      </form>
    </Form>
  );
}
