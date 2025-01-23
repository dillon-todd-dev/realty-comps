import React, { Suspense } from 'react';
import PropertyDetails from './property-details';
import { HydrateClient } from '@/trpc/server';
import { api } from '@/trpc/server';
import { SuspenseFallback } from '@/app/_components/suspense-fallback';

export default async function PropertyDetailPage({
  params,
}: {
  params: { propertyId: string };
}) {
  void api.property.getPropertyById.prefetch({
    propertyId: params.propertyId,
  });

  return (
    <HydrateClient>
      <div className='min-h-screen p-4 sm:p-6 md:p-8'>
        <div className='mx-auto max-w-7xl'>
          <Suspense fallback={<SuspenseFallback />}>
            <PropertyDetails propertyId={params.propertyId} />
          </Suspense>
        </div>
      </div>
    </HydrateClient>
  );
}
