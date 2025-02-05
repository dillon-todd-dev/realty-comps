'use client';

import { Button } from '@/components/ui/button';
import { DateField, DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
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
import { useEffect, useState } from 'react';

export default function InvestorsPage() {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [queryEnabled, setQueryEnabled] = useState(false);

  const { data, refetch, isLoading, isFetching } =
    api.investor.getInvestors.useQuery(
      {
        fromDate: fromDate?.toISOString() ?? '',
        toDate: toDate?.toISOString() ?? '',
        page,
      },
      {
        enabled: queryEnabled,
      },
    );

  const hasMorePages = data?.hasMore ?? false;

  async function handleSearch() {
    if (fromDate && toDate) {
      setPage(1);
      setQueryEnabled(true);
      await refetch();
    }
  }

  useEffect(() => {
    if (fromDate && toDate && queryEnabled) {
      const refetchInvestors = async () => {
        await refetch();
      };
      refetchInvestors();
    }
  }, [page, refetch, fromDate, toDate, queryEnabled]);

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
            <TableRow className='flex'>
              <TableHead className='flex-1 px-4 text-left'>Investor</TableHead>
              <TableHead className='flex-1 px-4 text-right'>
                # Properties
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? [...Array(15)].map((_, i) => (
                  <TableRow key={i} className='flex justify-between'>
                    <TableCell className='flex-1 px-4'>
                      <Skeleton className='h-6 w-full bg-gray-200' />
                    </TableCell>
                  </TableRow>
                ))
              : data?.investors?.map((investor: Document, i: number) => (
                  <TableRow key={i} className='flex'>
                    <TableCell className='flex-1 px-4 text-left'>
                      {investor._id}
                    </TableCell>
                    <TableCell className='flex-1 px-4 text-right'>
                      {investor.count}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <div className='mt-4 flex w-full flex-grow items-center justify-center gap-3'>
          <Button
            onClick={() => setPage((currPage) => Math.max(currPage - 1, 1))}
            disabled={page === 1 || isFetching}
          >
            Previous
          </Button>
          <span>Page {page}</span>
          <Button
            onClick={() => setPage((currPage) => currPage + 1)}
            disabled={!hasMorePages || isFetching}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}
