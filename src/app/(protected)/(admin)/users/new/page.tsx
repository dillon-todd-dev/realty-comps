import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NewUserForm } from './(components)/new-user-form';
import { ArrowLeft } from 'lucide-react';

export default function NewUserPage() {
  return (
    <>
      <Button
        className='border-light-300 text-dark-200 hover:bg-light-300 !important mb-10 w-fit border bg-white text-xs font-medium'
        asChild
      >
        <Link href='/users' className='flex items-center gap-1'>
          <ArrowLeft className='size-5' />
          Go Back
        </Link>
      </Button>
      <section className='w-full max-w-2xl'>
        <NewUserForm />
      </section>
    </>
  );
}
