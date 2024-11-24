import Image from 'next/image';
import NavIcons from './NavIcons';
import TopBarDirection from './TopBarDirection';
import Logo from '../../../public/Logo-noText.png';
import LogoWhite from '../../../public/Logo-white-noText.png';
import DrawerSideBar from './DrawerSideBar';
import DrawerIcons from './DrawerIcons';
export default function TopBar({ lng }: { lng: string }) {
  return (
    <nav className='flex w-full items-center justify-between border-b-2 border-opacity-15 bg-white px-8 py-4 dark:border-dark-text-secondary dark:border-opacity-40 dark:bg-dark-primary'>
      <div className='flex items-center justify-start gap-4 text-text-primary dark:text-text-secondary md:gap-12 lg:justify-between lg:gap-40'>
        <DrawerSideBar lng={lng} className='z-20 block lg:hidden' />
        <Image
          src={Logo}
          alt='Logo planifia'
          height={50}
          className='block dark:hidden'
        />
        <Image
          src={LogoWhite}
          alt='Logo planifia'
          height={50}
          className='hidden dark:block'
        />
        <TopBarDirection lng={lng} />
      </div>
      <div className='hidden lg:block'>
        <NavIcons lng={lng} />
      </div>
      <DrawerIcons lng={lng} className='z-10 block pt-2 lg:hidden' />
    </nav>
  );
}
