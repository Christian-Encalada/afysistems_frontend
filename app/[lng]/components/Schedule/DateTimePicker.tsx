import { Popover, PopoverContent, PopoverTrigger } from '../ui/popoverClient';
import { Calendar } from '../ui/calendarClient';
import { CalendarIcon } from 'lucide-react';
import moment from 'moment-timezone';

export default function DateTimePicker({
  date,
  setDate,
  hour,
  setHour,
  minute,
  setMinute,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  hour: string;
  setHour: (value: string) => void;
  minute: string;
  setMinute: (value: string) => void;
}) {
  const restrictInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    min: number,
    max: number
  ) => {
    const value = parseInt(event.target.value, 10);
    if (value >= min && value <= max) {
      event.target.value = value.toString();
    } else {
      event.target.value = '';
    }
  };

  return (
    <div className='space-y-2'>
      <label className='font-normal text-text-primary dark:font-light dark:text-text-secondary'>
        Fecha y Hora
      </label>
      <div className='flex-row space-y-2 sm:flex sm:space-x-2 sm:space-y-0'>
        <Popover>
          <PopoverTrigger asChild>
            <button className='min-w-sm flex w-full items-center justify-start gap-2 rounded border border-slate-400 bg-white p-2 px-3 text-left text-sm font-normal text-text-primary placeholder:text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary'>
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date ? moment(date).format('DD/MM/YYYY') : 'Seleccionar fecha'}
            </button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className='flex items-center space-x-2'>
          <input
            type='number'
            min='0'
            max='23'
            placeholder='H'
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            onInput={(e) => restrictInput(e as any, 0, 23)}
            className='w-[60px] rounded border border-slate-400 bg-white px-3 py-2 text-sm text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary'
          />
          <span>:</span>
          <input
            type='number'
            min='0'
            max='59'
            placeholder='M'
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            onInput={(e) => restrictInput(e as any, 0, 59)}
            className='w-[60px] rounded border border-slate-400 bg-white px-3 py-2 text-sm text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary'
          />
        </div>
      </div>
    </div>
  );
}
