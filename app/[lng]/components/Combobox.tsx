import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/utils/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popoverClient';
import { useTranslation } from '@/i18n/client';
import { ComboboxProps } from '@/types/ComboboxProps';

export function Combobox({ items, value, onChange, type, lng }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation(lng, type as any);

  const handleSelect = (currentValue: string) => {
    onChange(currentValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            '-ml-2 flex w-40 max-w-sm items-center gap-2 rounded border border-slate-400 bg-white p-2 text-left text-sm font-normal text-text-primary placeholder:text-text-primary dark:bg-dark-text-secondary dark:text-dark-text-primary dark:placeholder-dark-text-primary'
          )}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : t('filter_by_canton')}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </button>
      </PopoverTrigger>
      <PopoverContent className={`w-40 p-0`}>
        <Command>
          <CommandInput placeholder={t('search_canton')} />
          <CommandList>
            <CommandEmpty>{t('no_canton')}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => handleSelect(item.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
