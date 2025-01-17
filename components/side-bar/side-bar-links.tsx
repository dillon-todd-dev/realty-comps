'use client';

import { cn } from '@/lib/utils';
import { HomeIcon, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

export const dashboardLinks = [
  {
    id: 0,
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 1,
    name: 'Properties',
    href: '/dashboard/properties',
    icon: HomeIcon,
  },
];

export function SideBarLinks() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <SidebarMenu>
      {dashboardLinks.map((link) => (
        <SidebarMenuItem key={link.id}>
          <SidebarMenuButton asChild>
            <Link
              href={link.href}
              className={cn(
                pathname === link.href
                  ? 'text-primary bg-primary/10 hover:bg-primary/10'
                  : 'text-muted-foreground hover:text-forefround',
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-foreground',
              )}
            >
              <link.icon className='size-4' />
              {link.name}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
