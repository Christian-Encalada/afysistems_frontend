'use client';

import { useTranslation } from '@/i18n/client';
import Image from 'next/image';
import LogoWhite from '../../../public/Logo-white-noText.png';

export default function LayoutResetPassword({
  params: { lng },
  children,
}: {
  params: { lng: string };
  children: React.ReactNode;
}) {
  const { t } = useTranslation(lng, 'layoutResetPassword');

  return (
    <div className='flex min-h-screen w-full flex-col items-center bg-bg-primary px-4'>
      <header className='flex w-full items-center justify-center py-14'>
        <Image src={LogoWhite} alt='Logo Planifia' className='sm:w-57 w-60' />
      </header>
      <main className='flex w-full max-w-md flex-col items-center justify-center gap-5 p-6'>
        <h2 className='text-xl font-bold text-text-secondary'>
          {t('header_message')}
        </h2>
        <div className='flex w-full flex-col gap-5'>{children}</div>
      </main>
    </div>
  );
}
