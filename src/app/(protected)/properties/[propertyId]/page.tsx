import React, { Suspense } from 'react';
import PropertyDetails from './(components)/property-details';
import { HydrateClient } from '@/trpc/server';
import { api } from '@/trpc/server';
import { SuspenseFallback } from '@/components/suspense-fallback';

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = await params;
  void api.property.getPropertyById.prefetch({
    propertyId: propertyId,
  });

  return (
    <HydrateClient>
      <div className='min-h-screen p-4 sm:p-6 md:p-8'>
        <div className='mx-auto max-w-7xl'>
          <Suspense fallback={<SuspenseFallback />}>
            <PropertyDetails propertyId={propertyId} />
          </Suspense>
        </div>
      </div>
    </HydrateClient>
  );
}
