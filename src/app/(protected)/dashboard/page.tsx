'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const DashboardPage = () => {
  const handleSignOut = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect('/auth/login');
        },
      },
    });
  };

  return (
    <section className='w-full rounded-2xl bg-white p-7'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>Home</h2>
      </div>
      <div className='mt-7 w-full overflow-hidden'>
        <div>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
