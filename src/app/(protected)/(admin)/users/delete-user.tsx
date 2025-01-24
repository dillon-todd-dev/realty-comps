'use client';

import { api } from '@/trpc/react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

export function DeleteUser({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const deleteUser = api.user.deleteUser.useMutation();

  const handleDeleteUser = () => {
    deleteUser.mutate(
      { userId },
      {
        onSuccess: async () => {
          await utils.user.getUsers.invalidate();
          toast.success('User deleted successfully');
        },
        onError: () => {
          toast.error('Failed to delete user');
        },
      },
    );
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteUser}
            disabled={deleteUser.isPending}
          >
            {deleteUser.isPending ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
