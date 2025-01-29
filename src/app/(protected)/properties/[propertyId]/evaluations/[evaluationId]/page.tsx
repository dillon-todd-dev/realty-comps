'use client';

import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/trpc/react';
import DealTerms from '@/app/(protected)/properties/[propertyId]/evaluations/[evaluationId]/(components)/deal-terms';
import ConventionalFinancing from '@/app/(protected)/properties/[propertyId]/evaluations/[evaluationId]/(components)/conventional-financing';
import HardMoneyFinancing from '@/app/(protected)/properties/[propertyId]/evaluations/[evaluationId]/(components)/hard-money-financing';
import SaleComparables from '@/app/(protected)/properties/[propertyId]/evaluations/[evaluationId]/sale-comparables';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EvaluationPage() {
  const [hardMoneyOpen, setHardMoneyOpen] = useState(false);
  const [conventionalMoneyOpen, setConventionalMoneyOpen] = useState(false);

  const { evaluationId } = useParams();
  if (!evaluationId) {
    return notFound();
  }

  const { data: evaluation, error } = api.evaluation.getEvaluationById.useQuery(
    {
      evaluationId: evaluationId as string,
    },
  );

  if (error) {
    return notFound();
  }

  return (
    <div className='min-h-screen p-4 sm:p-6 md:p-8'>
      <div className='mx-auto max-w-7xl space-y-8'>
        <Card className='mb-6 border-sidebar-border bg-sidebar'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-2xl font-bold'>
                  {evaluation?.property.address.street}
                </p>
                <p className='mt-2'>
                  {evaluation?.property.address.city},{' '}
                  {evaluation?.property.address.state}{' '}
                  {evaluation?.property.address.postalCode}
                </p>
              </div>
              <Button asChild>
                <Link href={`/properties/${evaluation?.propertyId}`}>
                  <ArrowLeft className='mr-1 h-4 w-4' />
                  Back to Property
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <SaleComparables />
        <Card className='border-sidebar-border bg-sidebar'>
          <CardHeader>
            <CardTitle>Cash Flow Analysis</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <DealTerms evaluation={evaluation!} />
            <ConventionalFinancing
              evaluation={evaluation!}
              conventionalMoneyOpen={conventionalMoneyOpen}
              setConventionalMoneyOpen={setConventionalMoneyOpen}
            />
            <HardMoneyFinancing
              evaluation={evaluation!}
              hardMoneyOpen={hardMoneyOpen}
              setHardMoneyOpen={setHardMoneyOpen}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
