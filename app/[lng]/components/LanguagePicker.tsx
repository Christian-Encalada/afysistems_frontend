'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/[lng]/components/ui/sites/dropdown-menu';
import { MdLanguage } from 'react-icons/md';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from '@/i18n/client';
import { useCookies } from 'react-cookie';
import { cookieName, languages } from '@/i18n/settings';
import i18next from 'i18next';
import Flag from 'react-world-flags';

interface LanguagePickerProps {
  lng: string;
}

export default function LanguagePicker({ lng }: LanguagePickerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation(lng, 'dashboardIcons');
  const [_, setCookie] = useCookies([cookieName]);

  // Change language, update cookie and change pathname
  const changeLanguage = (newLng: string) => {
    i18next.changeLanguage(newLng);
    setCookie(cookieName, newLng, { path: '/' });
    const newPathname = pathname.replace(`/${lng}/`, `/${newLng}/`);
    router.push(newPathname);
  };

  // Get the code flag for the language
  const getFlagCode = (lang: string) => {
    const codes: { [key: string]: string } = {
      es: 'ec',
      en: 'us',
    };
    return codes[lang] || '';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className='flex cursor-pointer items-center gap-2 text-text-primary dark:text-text-secondary'
          title={t('language')}
        >
          <MdLanguage className='h-5 w-5' />
          <p>{lng.toUpperCase()}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='dark:bg-dark-primary'>
        {languages.map((lang) => (
          <DropdownMenuCheckboxItem
            key={lang}
            checked={lang === lng}
            onCheckedChange={() => changeLanguage(lang)}
            className={`${lang === lng ? 'font-bold' : ''} gap-2`}
          >
            <Flag code={getFlagCode(lang)} className='h-4 w-4' />
            <span>{t(lang as 'en' | 'es')}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
