'use client';

import { MdLanguage } from 'react-icons/md';
import { useTranslation } from '@/i18n/client';
import ThemeSwitch from './ThemeSwitch';
import { ICONS } from '@/utils/iconsTopBar';
import UserDropdown from '@/[lng]/components/UserDropdown/UserDropdown';
import LanguagePicker from '@/[lng]/components/LanguagePicker';

export default function NavIcons({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'dashboardIcons');
  return (
    <div className='flex flex-wrap items-center gap-4 md:gap-7'>
      <LanguagePicker lng={lng} />
      {ICONS.map((icon) => (
        <div
          key={icon.titleKey}
          title={t(icon.titleKey)}
          className='text-text-primary dark:text-text-secondary'
        >
          {icon.icon}
        </div>
      ))}
      <UserDropdown lng={lng}/>
      <ThemeSwitch />
    </div>
  );
}
