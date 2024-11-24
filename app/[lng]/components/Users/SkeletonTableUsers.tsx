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
} from '../ui/tableClient';
import { useTranslation } from '@/i18n/client';

export default function SkeletonTableUsers({
  rows = 5,
  columns = 9,
  lng,
}: {
  rows?: number;
  columns?: number;
  lng: string;
}) {
  const { t } = useTranslation(lng, 'users');
  return (
    <div>
      <div className='mb-5 flex items-center justify-between'>
        <h1 className='text-xl'>{t('manage')}</h1>
        <div className='h-10 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
      </div>
      <div className='flex items-end justify-between'>
        <div className='flex items-end gap-2'>
          <div className='h-8 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
          <div className='h-8 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
          <div className='h-8 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
          <div className='h-8 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
        </div>
        <div className='h-7 w-7 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
      </div>
      <div className='mt-2 animate-pulse overflow-hidden rounded-md border border-text-primary dark:border-2 dark:border-dark-text-secondary'>
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableHead key={colIndex}>
                  <div className='h-6 animate-pulse rounded bg-gray-300 dark:bg-gray-600'></div>
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
      <div className='mt-2 flex items-center justify-between'>
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
          <div className='h-10 w-[120px] animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
        </div>
      </div>
    </div>
  );
}
