'use client';

import { Button } from '@/components/ui/button';
import { DateField, DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/trpc/react';
import { Document } from 'mongodb';
import { useState } from 'react';

export default function InvestorsPage() {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  const {
    data: investors,
    refetch,
    isLoading,
  } = api.investor.getInvestors.useQuery(
    {
      fromDate: fromDate?.toISOString() ?? '',
      toDate: toDate?.toISOString() ?? '',
    },
    {
      enabled: fromDate !== undefined && toDate !== undefined,
    },
  );

  async function handleSearch() {
    await refetch();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='w-full rounded-2xl bg-white p-8'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>Investors</h2>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <Label>From:</Label>
            <DatePicker date={fromDate} setDate={setFromDate} label='Date from'>
              <DateField />
            </DatePicker>
          </div>
          <div className='ml-3 flex items-center gap-2'>
            <Label>To:</Label>
            <DatePicker date={toDate} setDate={setToDate} label='Date to'>
              <DateField />
            </DatePicker>
          </div>
          <Button className='ml-3' onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
      <div className='mt-7 w-full overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow className='flex w-full items-center justify-around'>
              <TableHead className='w-[100px]'>Investor</TableHead>
              <TableHead># Properties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investors &&
              investors.map((investor: Document) => (
                <TableRow
                  key={investor._id}
                  className='flex w-full items-center justify-around'
                >
                  <TableCell className='text-left'>{investor._id}</TableCell>
                  <TableCell className='text-right'>{investor.count}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
