import { useTranslation } from '@/i18n/client';
import { PaginationControlsProps } from '@/types/table';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md';
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/[lng]/components/ui/selectClient';

export default function PaginationControls<TData>({
  table,
  lng,
}: PaginationControlsProps<TData> & { lng: string }) {
  const { t } = useTranslation(lng, 'clients');
  return (
    <div className='mt-2 flex flex-col items-center justify-between space-y-2 md:flex-row md:space-x-4 md:space-y-0'>
      <div className='flex items-center gap-2'>
        <button
          className='rounded-lg bg-bg-primary p-2 text-text-secondary disabled:opacity-50 dark:bg-dark-primary dark:text-dark-text-primary'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <MdFirstPage />
          <span className='sr-only'>Go to first page</span>
        </button>
        <button
          className='rounded-lg bg-bg-primary p-2 text-text-secondary disabled:opacity-50 dark:bg-dark-primary dark:text-dark-text-primary'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <MdKeyboardArrowLeft />
          <span className='sr-only'>Go to previous page</span>
        </button>
        <button
          className='rounded-lg bg-bg-primary p-2 text-text-secondary disabled:opacity-50 dark:bg-dark-primary dark:text-dark-text-primary'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <MdKeyboardArrowRight />
          <span className='sr-only'>Go to next page</span>
        </button>
        <button
          className='rounded-lg bg-bg-primary p-2 text-text-secondary disabled:opacity-50 dark:bg-dark-primary dark:text-dark-text-primary'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <MdLastPage />
          <span className='sr-only'>Go to last page</span>
        </button>
      </div>

      <div className='flex items-center justify-center text-sm font-medium'>
        {t('page')} {table.getState().pagination.pageIndex + 1} {t('of')}{' '}
        {table.getPageCount()}
      </div>

      <div className='flex items-center space-x-2'>
        <p className='text-sm font-medium'>{t('rows_per_page')}</p>
        <Select
          onValueChange={(value) => table.setPageSize(Number(value))}
          value={table.getState().pagination.pageSize.toString()}
        >
          <SelectTrigger className='w-24'>
            <SelectValue placeholder={t('show_rows')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {t('show_rows')} {pageSize}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
