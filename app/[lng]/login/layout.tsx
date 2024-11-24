'use client';
import { useTranslation } from '@/i18n/client';
import Image from 'next/image';
import Link from 'next/link';
import LogoWhite from '../../../public/Logo-white-noText.png';

export default function LayoutLogin({
  params: { lng },
  children,
}: {
  params: { lng: string };
  children: React.ReactNode;
}) {
  const { t } = useTranslation(lng, 'layoutLogin');
  const getActualYear = () => new Date().getFullYear();
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-start bg-bg-primary px-4 sm:px-28 md:px-12'>
      <header className='flex w-full items-center justify-center py-14 md:justify-start xl:ml-10'>
        <p className='text-xl font-normal text-text-secondary'>
          {t('sign_in')}
        </p>
      </header>
      <div className='flex w-full flex-1 flex-col items-center justify-center gap-5 md:flex-row md:justify-between xl:justify-center xl:gap-80'>
        <div className='mb-5 flex flex-col items-center gap-7 md:items-start md:gap-16'>
          <p className='text-center text-4xl font-light text-text-secondary sm:text-5xl md:w-[380px] md:text-left lg:text-7xl xl:w-[560px]'>
            {t('welcome_message')}
          </p>
          <div>
            <Image
              src={LogoWhite}
              alt='Logo planifia'
              className='w-40 sm:w-52'
            />
          </div>
        </div>
        <div className='flex w-full flex-col gap-5 md:w-96 lg:w-[450px]'>
          {children}
          <p className='mb-14 text-center text-text-secondary'>
            Copyright © {getActualYear()}{' '}
            <Link href='#' className='font-bold underline'>
              Planifia.
            </Link>{' '}
            {t('copy_right')}
          </p>
        </div>
      </div>
    </div>
  );
}
