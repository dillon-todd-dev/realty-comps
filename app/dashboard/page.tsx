import { Button } from '@/components/ui/button';
import { requireUser } from '../utils/hooks';
import { logout } from '@/app/actions';

export default async function DashboardRoute() {
  await requireUser();

  return (
    <div>
      <h1>hello from the dashboard</h1>
      <form action={logout}>
        <Button type='submit'>Sign Out</Button>
      </form>
    </div>
  );
}
