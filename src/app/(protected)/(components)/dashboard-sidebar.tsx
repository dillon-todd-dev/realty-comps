'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { authClient } from '@/lib/auth-client';
import { cn, getInitials } from '@/lib/utils';
import {
  AppWindow,
  FileUser,
  Users,
  LayoutDashboard,
  Home,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const navItems = [
  {
    label: 'Home',
    route: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Properties',
    route: '/properties',
    icon: Home,
  },
];

const adminNavItems = [
  {
    label: 'Users',
    route: '/users',
    icon: Users,
  },
  {
    label: 'Investors',
    route: '/investors',
    icon: FileUser,
  },
];

export default function DashboardSidebar({
  isAdmin,
  name,
  email,
}: {
  isAdmin: boolean;
  name: string;
  email: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className='sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10'>
      <div>
        <div className='border-primary-dashboard/20 flex flex-row items-center gap-2 border-b border-dashed pb-10 max-md:justify-center'>
          <AppWindow />
          <h1 className='text-primary-dashboard text-2xl font-semibold max-md:hidden'>
            RealtyComps
          </h1>
        </div>
        <div className='mt-10 flex flex-col gap-5'>
          {navItems.map((link) => {
            const isActive =
              pathname === link.route ||
              (pathname.includes(link.route) && pathname.length > 1);

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    'flex w-full flex-row items-center gap-2 rounded-lg px-5 py-3.5 max-md:justify-center',
                    isActive && 'bg-primary-dashboard shadow-sm',
                  )}
                >
                  <div className='relative size-5'>
                    <link.icon
                      className='size-5'
                      color={isActive ? 'white' : 'black'}
                    />
                  </div>
                  <p
                    className={cn(
                      'text-base font-medium max-md:hidden',
                      isActive ? 'text-white' : 'text-dark',
                    )}
                  >
                    {link.label}
                  </p>
                </div>
              </Link>
            );
          })}
          {isAdmin &&
            adminNavItems.map((link) => {
              const isActive =
                pathname === link.route ||
                (pathname.includes(link.route) && pathname.length > 1);

              return (
                <Link href={link.route} key={link.route}>
                  <div
                    className={cn(
                      'flex w-full flex-row items-center gap-2 rounded-lg px-5 py-3.5 max-md:justify-center',
                      isActive && 'bg-primary-dashboard shadow-sm',
                    )}
                  >
                    <div className='relative size-5'>
                      <link.icon
                        className='size-5'
                        color={isActive ? 'white' : 'black'}
                      />
                    </div>
                    <p
                      className={cn(
                        'text-base font-medium max-md:hidden',
                        isActive ? 'text-white' : 'text-dark',
                      )}
                    >
                      {link.label}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <div className='border-light-400 my-8 flex w-full flex-row gap-2 rounded-full border px-6 py-2 shadow-sm max-md:px-2'>
        <Avatar>
          <AvatarFallback className='bg-amber-100'>
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col max-md:hidden'>
          <p className='text-dark-200 font-semibold'>{name}</p>
          <p className='text-light-500 text-xs'>{email}</p>
        </div>
        <div className='flex items-center'>
          <LogOut
            color='red'
            className='size-5 hover:cursor-pointer'
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push('/auth/login');
                    toast.success('Logged out successfully');
                  },
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
