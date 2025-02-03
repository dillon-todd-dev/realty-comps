'use client';

import { Button } from '@/components/ui/button';
import { DateField, DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { reformatName } from '@/lib/utils';
import { api } from '@/trpc/react';

export default function InvestorsPage() {
  const { data: investors, refetch } = api.investor.getInvestors.useQuery(
    undefined,
    {
      enabled: false,
    },
  );

  async function handleSearch() {
    await refetch();
  }

  return (
    <section className='w-full rounded-2xl bg-white p-8'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>Investors</h2>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <Label>From:</Label>
            <DatePicker label='Date from'>
              <DateField />
            </DatePicker>
          </div>
          <div className='ml-3 flex items-center gap-2'>
            <Label>To:</Label>
            <DatePicker label='Date to'>
              <DateField />
            </DatePicker>
          </div>
          <Button className='ml-3' onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
      <div className='mt-7 w-full overflow-hidden'>
        {investors &&
          investors.map((investor: any) => (
            <div key={investor.fileNumber}>
              {reformatName(investor.grantees[0])}
            </div>
          ))}
      </div>
    </section>
  );
}
