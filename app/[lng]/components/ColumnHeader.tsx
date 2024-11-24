import { RxArrowDown, RxArrowUp, RxCaretSort, RxEyeNone } from 'react-icons/rx';

import { cn } from '@/utils/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/[lng]/components/ui/dropdown-menu-client';
import { DataTableColumnHeaderProps } from '@/types/table';
import { t } from 'i18next';

export default function DataTableColumnHeader<TData, TValue>({
  column,
  type,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div className={`${cn(className)} -ml-2 px-2 py-1.5`}>
        {t(`${type}:${title}`)}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='-ml-2 flex h-8 items-center rounded-lg px-2 hover:bg-bg-primary-opacity data-[state=open]:bg-bg-primary-opacity dark:hover:bg-dark-secondary dark:data-[state=open]:bg-dark-secondary'>
            <span className='whitespace-nowrap'>{t(`${type}:${title}`)}</span>
            {column.getIsSorted() === 'desc' ? (
              <RxArrowDown className='ml-2 h-4 w-4 flex-shrink-0' />
            ) : column.getIsSorted() === 'asc' ? (
              <RxArrowUp className='ml-2 h-4 w-4 flex-shrink-0' />
            ) : (
              <RxCaretSort className='ml-2 h-4 w-4 flex-shrink-0' />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <RxArrowUp className='mr-2 h-3.5 w-3.5' />
            <span>Asc</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <RxArrowDown className='mr-2 h-3.5 w-3.5' />
            <span>Desc</span>
          </DropdownMenuItem>
          {type === 'clients' && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <RxEyeNone className='mr-2 h-3.5 w-3.5' />
                <span>{t('clients:hide')}</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
