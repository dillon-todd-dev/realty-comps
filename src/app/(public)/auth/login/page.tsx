import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth, signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect('/dashboard');

  return (
    <div className='flex h-screen w-full items-center justify-center px-10'>
      <Card className='max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl'>Welcome Back!</CardTitle>
          <CardDescription>Login to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              'use server';
              await signIn('credentials', formData);
            }}
            className='gapy-y-4 flex flex-col'
          >
            <div className='flex flex-col gap-y-2'>
              <Label>Email</Label>
              <Input
                type='email'
                name='email'
                placeholder='example@example.com'
              />
            </div>
            <div className='flex flex-col gap-y-2'>
              <Label>Password</Label>
              <Input type='password' name='password' placeholder='********' />
            </div>
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
