import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NewPropertyForm } from './(components)/new-property-form';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { ArrowLeft } from 'lucide-react';

export default async function PropertiesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/auth/login');

  return (
    <>
      <Button className='back-btn' asChild>
        <Link href='/properties' className='flex items-center gap-1'>
          <ArrowLeft className='size-4' />
          Go Back
        </Link>
      </Button>
      <section className='w-full max-w-2xl'>
        <NewPropertyForm />
      </section>
    </>
  );
}
