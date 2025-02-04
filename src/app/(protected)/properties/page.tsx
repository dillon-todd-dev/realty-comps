import { PropertiesGrid } from './(components)/properties-grid';
import { api, HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { SuspenseFallback } from '@/components/suspense-fallback';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

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
      <section className='w-full rounded-2xl bg-white p-7'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <h2 className='text-xl font-semibold'>Properties</h2>
          <Button className='bg-primary-dashboard'>
            <Link
              href='/properties/new'
              className='flex items-center gap-1 text-white'
            >
              <Plus className='size-4' />
              Add Property
            </Link>
          </Button>
        </div>
        <div className='mt-7 w-full overflow-hidden'>
          <Suspense fallback={<SuspenseFallback />}>
            <PropertiesGrid page={currentPage} />
          </Suspense>
        </div>
      </section>
    </HydrateClient>
  );
}
