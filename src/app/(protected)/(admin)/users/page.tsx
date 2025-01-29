import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { columns } from '@/app/(protected)/(admin)/users/(components)/columns';
import { DataTable } from '@/app/(protected)/(admin)/users/(components)/data-table';
import { api, HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const SuspenseFallback = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Loader2 className='size-10 animate-spin' />
    </div>
  );
};

export default async function UsersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/auth/login');
  if (session.user.role !== 'admin') redirect('/dashboard');

  void api.user.getUsers.prefetch();

  return (
    <HydrateClient>
      <div className='container mx-auto py-10'>
        <Suspense fallback={<SuspenseFallback />}>
          <DataTable columns={columns} />
        </Suspense>
      </div>
    </HydrateClient>
  );
}
