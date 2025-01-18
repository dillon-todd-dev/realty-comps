import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth, signIn } from '../utils/auth';
import { SubmitButton } from '@/components/buttons/submit-button';
import { redirect } from 'next/navigation';
import { login } from '../actions';

export default async function Login() {
  const session = await auth();
  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen w-full px-4'>
        <Card className='max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={login} className='flex flex-col gap-y-4'>
              <div className='flex flex-col gap-y-2'>
                <Label>Email</Label>
                <Input type='email' name='email' placeholder='hello@hello.com' />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
