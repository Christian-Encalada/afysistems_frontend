import { cn } from '@/utils/utils';
import { DataTableStatusHeaderProps } from '@/types/table';
import { t } from 'i18next';

export default function DataTableStatusHeader<TData, TValue>({
  status,
  className,
}: DataTableStatusHeaderProps) {

  const statusClass = status
    ? 'bg-green-100 text-green-800 dark:bg-gray-300 dark:text-black'
    : 'bg-red-100 text-red-800 dark:bg-gray-600 dark:text-gray-300';

  return (
    <span
      className={`${cn(
        className,
        'flex items-center justify-center w-24 h-8 rounded-full text-xs font-semibold'
      )} ${statusClass}`}
    >
      {status ? t('sites:active') : t('sites:inactive')}
    </span>
  );
}
