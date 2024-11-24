import { TranslationKeys } from '@/types/dashboardLayout';
import { MdOutlineNotificationsNone } from 'react-icons/md';

export const ICONS: { titleKey: TranslationKeys; icon: JSX.Element }[] = [
  {
    titleKey: 'notifications',
    icon: <MdOutlineNotificationsNone className='h-5 w-5 cursor-pointer' />,
  },
];
