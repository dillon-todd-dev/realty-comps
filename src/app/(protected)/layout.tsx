import { SidebarProvider } from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AppSidebar from '@/app/_components/app-sidebar';

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      {/* app sidebar */}
      <AppSidebar />
      <main className='m-2 w-full'>
        <div className='flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar p-2 px-4 shadow'>
          {/* search bar */}
          <div className='ml-auto'></div>
          <UserButton />
        </div>
        <div className='h-4'></div>
        {/* main content */}
        <div className='h-[calc(100vh-5rem)] overflow-y-scroll rounded-md border border-sidebar-border bg-sidebar p-4 shadow'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
