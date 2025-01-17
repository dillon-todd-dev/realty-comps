'use client';

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/realty-comps-logo.png';
import { SideBarLinks } from '@/components/side-bar/side-bar-links';

export function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className='h-14 flex items-center justify-center border-b px-4 lg:h-[60px] lg:px-6'>
        <Link href='/' className='flex items-center gap-4'>
          <Image src={Logo} alt='RealtyComps' className='size-7' />
          <span className='text-2xl font-bold'>
            Realty<span className='text-blue-500'>Comps</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className='pt-2'>
        <SideBarLinks />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
