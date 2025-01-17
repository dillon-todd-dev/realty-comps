import Link from 'next/link';
import { requireUser } from '../utils/hooks';
import Logo from '@/public/realty-comps-logo.png';
import Image from 'next/image';
import { SideBarLinks } from '@/components/side-bar/side-bar-links';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSideBar } from '@/components/side-bar/app-side-bar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User2 } from 'lucide-react';
import { signOut } from '../utils/auth';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Breadcrumbs } from '@/components/nav-bar/breadcrumbs';

type LayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: LayoutProps) {
  const session = await requireUser();

  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center gap-2'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              <Breadcrumbs />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='rounded-full' variant='outline' size='icon'>
                  <User2 />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href='/dashboard'>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/dashboard/properties'>Properties</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form
                    className='w-full'
                    action={async () => {
                      'use server';
                      await signOut();
                    }}
                  >
                    <button className='w-full text-left'>Log out</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
