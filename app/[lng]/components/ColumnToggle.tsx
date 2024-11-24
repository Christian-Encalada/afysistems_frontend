'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { RxMixerHorizontal } from 'react-icons/rx';
import { Table } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from '@/[lng]/components/ui/dropdown-menu-client';
import { useTranslation } from '@/i18n/client';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function ColumnToggle<TData>({
  table,
  lng,
}: DataTableViewOptionsProps<TData> & { lng: string }) {
  const { t } = useTranslation(lng, 'clients');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='ml-auto flex items-center gap-2 rounded-lg bg-bg-primary p-2 text-sm text-text-secondary dark:bg-dark-primary dark:text-dark-text-primary'>
          <RxMixerHorizontal className='h-4 w-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]'>
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {t(column.id as any)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
