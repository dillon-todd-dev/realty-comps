'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import { daysAgo } from '@/lib/utils';
import { api } from '@/trpc/react';
import { Prisma } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Property = Prisma.PropertyGetPayload<{ include: { address: true } }>;

const PROPERTIES_PER_PAGE = 6;

const PropertiesPage = () => {
  const { data: session } = useSession();
  if (!session) redirect('/auth/login');
  const searchParams = useSearchParams();
  const page: string | null = searchParams.get('page');
  const currentPage = page ? parseInt(page) : 1;
  const skip = PROPERTIES_PER_PAGE * (currentPage - 1);
  const { data, isLoading } = api.property.getProperties.useQuery({
    take: PROPERTIES_PER_PAGE,
    skip,
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className='flex min-h-[calc(100vh-9rem)] flex-col items-center justify-center p-4 sm:p-6 md:p-8'>
        <Loader2 className='size-10 animate-spin' />
      </div>
    );
  }

  if (!isLoading && data?.properties.length === 0) {
    return (
      <div className='flex min-h-[calc(100vh-9rem)] flex-col items-center justify-center p-4 sm:p-6 md:p-8'>
        <Button asChild>
          <Link href='/properties/create'>Add a property</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='flex min-h-[calc(100vh-9rem)] flex-col p-4 sm:p-6 md:p-8'>
      <div className='flex flex-grow justify-center'>
        <div className='grid h-full flex-grow grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
          {data?.properties?.map((property: Property) => (
            <Link key={property.id} href={`/properties/${property.id}`}>
              <Card className='max-height-[600px] flex h-full flex-col'>
                <div className='relative max-h-[300px] w-full pt-[50%]'>
                  <Image
                    src={property.imageUrl ?? '/no-image-available.jpg'}
                    alt='property'
                    fill
                    className='rounded-t-lg object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50 vw, 33vw'
                  />
                </div>
                <CardContent className='flex-grow p-4'>
                  <h2 className='text-xl font-semibold'>
                    {property.address.street}
                  </h2>
                  <p className='mt-2'>
                    {property.address.city}, {property.address.state}{' '}
                    {property.address.postalCode}
                  </p>
                  <div className='mx-4 mt-4 flex justify-between'>
                    <p>Evaluating</p>
                    {daysAgo(property.createdAt)} days ago
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className='mt-10'>
        <PaginationWithLinks
          totalCount={data?.totalProperties || 0}
          pageSize={PROPERTIES_PER_PAGE}
          page={currentPage}
        />
      </div>
    </div>
  );
};

export default PropertiesPage;
