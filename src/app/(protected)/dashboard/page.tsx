'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';

const DashboardPage = () => {
  const handleSignOut = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect('/auth/login');
        },
      },
    });
  };

  return (
    <div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default DashboardPage;
