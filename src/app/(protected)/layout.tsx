import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import { AppSidebar } from '@/app/_components/app-sidebar';

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      {/* app sidebar */}
      <AppSidebar />
      <main className='m-2 w-full'>
        {/* main content */}
        <div className='h-[calc(100vh-1rem)] overflow-y-scroll rounded-md border border-sidebar-border bg-sidebar p-4 shadow'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
