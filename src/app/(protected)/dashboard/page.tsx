'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const DashboardPage = () => {
  const { data: session } = useSession();
  if (!session) redirect('/auth/login');

  return <div>DashboardPage</div>;
};

export default DashboardPage;
