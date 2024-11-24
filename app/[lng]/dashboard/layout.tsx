import { generatePageMetadata } from '@/utils/metadata';
import DashboardDirection from '../components/DashboardDirection';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import { MetaParams } from '@/types';

export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'dashboard' });
}

export default function DashboardLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <div className='grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]'>
      <header className='z-20 col-span-2 shadow-[0px_5px_10px_-10px_rgba(0,0,0,0.4)] dark:shadow-md'>
        <TopBar lng={lng} />
      </header>
      <div className='z-10 row-start-2 hidden shadow-md dark:shadow-md lg:block'>
        <SideBar lng={lng} className='h-full' />
      </div>
      <div className='col-start-2 row-start-2 overflow-y-auto bg-text-secondary px-9 py-7 dark:bg-dark-secondary'>
        <DashboardDirection lng={lng} />
        {children}
      </div>
    </div>
  );
}
