import { PropertiesGrid } from './(components)/properties-grid';
import { api, HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { SuspenseFallback } from '@/components/suspense-fallback';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const PROPERTIES_PER_PAGE = 6;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string | undefined }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/auth/login');

  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  void api.property.getProperties.prefetch({
    take: PROPERTIES_PER_PAGE,
    skip: PROPERTIES_PER_PAGE * (currentPage - 1),
  });

  return (
    <HydrateClient>
      <div className='flex min-h-[calc(100vh-9rem)] flex-col p-4 sm:p-6 md:p-8'>
        <Suspense fallback={<SuspenseFallback />}>
          <PropertiesGrid page={currentPage} />
        </Suspense>
      </div>
    </HydrateClient>
  );
}
