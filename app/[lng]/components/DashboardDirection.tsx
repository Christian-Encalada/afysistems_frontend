'use client';

import { useTranslation } from '@/i18n/client';
import { DirectionKeys } from '@/types/dashboardLayout';
import { usePathname } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';

export default function DashboardDirection({ lng }: { lng: string }) {
  const path = usePathname();
  const arrayText = path.split('/').slice(2) as DirectionKeys[];
  const lastIndex = arrayText.length - 1;
  const { t } = useTranslation(lng, 'dashboardDirection');

  return (
    <div className='mb-10 flex items-center gap-2 text-sm'>
      <AiOutlineHome className='text-text-primary dark:text-text-secondary' />
      {arrayText.map((path, index) => (
        <div key={index} className='flex items-center gap-2'>
          {index > 0 && (
            <IoIosArrowForward className='dark:text-text-secondary' />
          )}
          <p
            className={
              index === lastIndex
                ? 'font-medium text-bg-primary dark:text-[#adbac7]'
                : 'text-text-primary dark:text-text-secondary'
            }
          >
            {t(path)}
          </p>
        </div>
      ))}
    </div>
  );
}
