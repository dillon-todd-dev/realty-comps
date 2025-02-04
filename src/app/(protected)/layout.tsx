import { auth } from '@/lib/auth';
import DashboardSidebar from './(components)/dashboard-sidebar';
import '@/styles/dashboard.css';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardHeader from './(components)/dashboard-header';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/auth/login');

  return (
    <main className='flex min-h-screen w-full'>
      <DashboardSidebar
        isAdmin={session.user.role === 'admin'}
        name={session.user.name}
        email={session.user.email}
      />
      <div className='bg-light-300 xs:p-10 flex w-[calc(100%-264px)] flex-1 flex-col p-5'>
        <DashboardHeader name={session.user.name} />
        {children}
      </div>
    </main>
  );
}
