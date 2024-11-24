'use client';

import { cn } from '@/utils/utils'; // Utilidad para concatenar clases
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popoverClient';
import { CalendarIcon, XCircleIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from './ui/calendarClient';
import { es, enUS } from 'date-fns/locale';
import { useTranslation } from '@/i18n/client';

interface DatePickerProps {
  onChange: (date: Date | undefined) => void;
  lng: string;
  type: string;
  className?: string;
  'data-testid'?: string; // Agregar data-testid como prop opcional
}

export default function DatePicker({
  onChange,
  lng,
  type,
  className,
  'data-testid': dataTestId, // Recibir data-testid aquí
}: DatePickerProps) {
  const [date, setDate] = useState<Date>();
  const { t } = useTranslation(lng, type as any);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange(selectedDate);
  };

  const clearDate = () => {
    setDate(undefined);
    onChange(undefined);
  };

  return (
    <div className='flex w-full'>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              className ||
                `${type === 'sites' ? 'hover:bg-bg-primary-opacity hover:text-text-primary dark:hover:bg-dark-primary dark:hover:text-slate-50' : ''} flex w-full items-center gap-2 rounded border border-slate-400 bg-white p-2 text-left text-sm font-normal text-text-primary placeholder:text-text-primary dark:bg-dark-text-secondary dark:text-dark-text-primary dark:placeholder-dark-text-primary`,
              !date && 'text-muted-foreground'
            )}
            data-testid={dataTestId} // Agregar data-testid aquí
          >
            {date ? (
              format(date, 'PPP', { locale: lng === 'es' ? es : enUS })
            ) : (
              <span>{t('filter_by_createdAt')}</span>
            )}
            <CalendarIcon className='ml-2 h-5 w-5 text-text-primary dark:text-dark-text-primary' />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            locale={lng === 'es' ? es : enUS}
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
            className="rounded-lg border border-slate-400 bg-white dark:bg-dark-secondary dark:border-slate-800"
          />
        </PopoverContent>
      </Popover>
      {date && (
        <button
          onClick={clearDate}
          className="flex items-center justify-center p-2 text-red-500 dark:text-red-400"
          aria-label="Clear date"
        >
          <XCircleIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}