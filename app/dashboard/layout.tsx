import Link from 'next/link';
import { requireUser } from '../utils/hooks';
import Logo from '@/public/realty-comps-logo.png';
import Image from 'next/image';
import { SideBarLinks } from '@/components/side-bar/side-bar-links';

type LayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: LayoutProps) {
  const session = await requireUser();

  return (
    <>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <div className='hidden border-r bg-muted/40 md:block'>
          <div className='flex flex-col max-h-screen h-full gap-2'>
            <div className='h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6'>
              <Link href='/' className='flex items-center gap-4'>
                <Image src={Logo} alt='RealtyComps' className='size-7' />
                <p className='text-2xl font-bold'>
                  Realty<span className='text-blue-500'>Comps</span>
                </p>
              </Link>
            </div>
            <div className='flex-1'>
              <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                <SideBarLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'></header>
        </div>
      </div>
    </>
  );
}
