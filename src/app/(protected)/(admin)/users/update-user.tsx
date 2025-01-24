'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { api } from '@/trpc/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/app/_components/submit-button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema } from '@/lib/schema';
import { z } from 'zod';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { User } from './columns';

export function UpdateUser({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const updateUser = api.user.updateUser.useMutation();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: user.name.split(' ')[0],
      lastName: user.name.split(' ')[1],
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
    },
  });

  const handleUpdateUser = (values: z.infer<typeof updateUserSchema>) => {
    updateUser.mutate(
      {
        userId: user.id,
        ...values,
      },
      {
        onSuccess: async () => {
          await utils.user.getUsers.invalidate();
          toast.success('User updated successfully');
        },
        onError: () => {
          toast.error('Failed to update user');
        },
      },
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit User
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateUser)}
            className='grid grid-cols-1 gap-4 md:grid-cols-1'
          >
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='md:col-span-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <FormLabel>Active</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        {...field}
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
                    <FormLabel>Admin</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton
              text='Update User'
              isLoading={form.formState.isSubmitting}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
