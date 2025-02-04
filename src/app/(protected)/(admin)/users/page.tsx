import { SuspenseFallback } from '@/components/suspense-fallback';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { api, HydrateClient } from '@/trpc/server';
import { Plus } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { DataTable } from './(components)/data-table';
import { columns } from './(components)/columns';

export default async function UsersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/auth/login');
  if (session.user.role !== 'admin') redirect('/dashboard');

  void api.user.getUsers.prefetch();

  return (
    <HydrateClient>
      <section className='w-full rounded-2xl bg-white p-7'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <h2 className='text-xl font-semibold'>Users</h2>
          <Button className='bg-primary-dashboard'>
            <Link
              href='/users/new'
              className='flex items-center gap-1 text-white'
            >
              <Plus className='size-4' />
              Add User
            </Link>
          </Button>
        </div>
        <div className='mt-7 w-full overflow-hidden'>
          <Suspense fallback={<SuspenseFallback />}>
            <DataTable columns={columns} />
          </Suspense>
        </div>
      </section>
    </HydrateClient>
  );
}
