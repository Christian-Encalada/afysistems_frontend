'use client';
import { useTranslation } from '@/i18n/client';
import { DirectionKeys } from '@/types/dashboardLayout';
import { usePathname } from 'next/navigation';
export default function TopBarDirection({ lng }: { lng: string }) {
  const path = usePathname();
  const direction = path.split('/').at(-2) as DirectionKeys;
  const { t } = useTranslation(lng, 'dashboardDirection');
  return (
    <p className='hidden text-xl font-medium text-text-primary text-opacity-70 dark:text-text-secondary md:block'>
      {t(direction)}
    </p>
  );
}
