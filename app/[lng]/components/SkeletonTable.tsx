import {
  MdFirstPage,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdLastPage,
} from 'react-icons/md';
import {
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  Table,
} from './ui/tableClient';
import { useTranslation } from '@/i18n/client';

export default function SkeletonTable({
  rows = 5,
  columns = 9,
  lng,
  type,
  mode='manage'
}: {
  rows?: number;
  columns?: number;
  lng: string;
  type: string;
  mode?: string;
}) {
  const { t } = useTranslation(lng, type as any);
  return (
    <div>
      <div className='mb-5 flex items-center justify-between'>
        {mode === 'manage' ? (
          <h1 className='text-base sm:text-xl'>{t('manage')}</h1>
        ) : mode === 'list' ? (
          <h1 className='text-base sm:text-xl'>{t('list')}</h1>
        ) : (
          <h1 className='text-base sm:text-xl'>{t('report')}</h1>
        )}
        <div className='h-10 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
      </div>
      <div className='flex items-end justify-end'>
        <div className='h-7 w-7 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
      </div>
      <div className='mt-2 animate-pulse overflow-hidden rounded-md border border-text-primary dark:border-2 dark:border-dark-text-secondary'>
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableHead key={colIndex}>
                  <div className='my-2 w-36 flex-col'>
                    <div className='h-7 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <div className='h-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='mt-2 flex flex-col items-center justify-between space-y-2 md:flex-row md:space-x-4 md:space-y-0'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center space-x-2'>
            <div className='flex animate-pulse items-center justify-center rounded-lg bg-gray-200 px-3 py-2 dark:bg-gray-700'>
              <MdFirstPage className='animate-pulse text-gray-400' />
            </div>
            <div className='flex animate-pulse items-center justify-center rounded-lg bg-gray-200 px-3 py-2 dark:bg-gray-700'>
              <MdKeyboardArrowLeft className='animate-pulse text-gray-400' />
            </div>
            <div className='flex animate-pulse items-center justify-center rounded-lg bg-gray-200 px-3 py-2 dark:bg-gray-700'>
              <MdKeyboardArrowRight className='animate-pulse text-gray-400' />
            </div>
            <div className='flex animate-pulse items-center justify-center rounded-lg bg-gray-200 px-3 py-2 dark:bg-gray-700'>
              <MdLastPage className='animate-pulse text-gray-400' />
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center text-sm font-medium'>
          <div className='h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
        </div>

        <div className='flex items-center space-x-2'>
          <div className='h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
          <div className='h-8 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
        </div>
      </div>
    </div>
  );
}
