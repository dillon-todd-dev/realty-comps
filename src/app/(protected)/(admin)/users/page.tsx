import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function UsersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/auth/login');
  if (session.user.role !== 'admin') redirect('/dashboard');

  return <div>Users</div>;
}
