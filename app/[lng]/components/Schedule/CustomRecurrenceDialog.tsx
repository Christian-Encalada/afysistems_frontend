'use client';

import * as React from 'react';
import { Button } from '../../components/ui/buttonClient';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialogClient';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/selectClient';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Calendar } from '../../components/ui/calendarClient';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popoverClient';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../../utils/utils';

interface CustomRecurrenceDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  recurrenceSettings: {
    interval: number;
    repeatUnit: string;
    selectedDays: string[];
    endType: string;
    endDate: Date | undefined;
    occurrences: number;
  };
  updateRecurrenceSettings: (
    key: keyof CustomRecurrenceDialogProps['recurrenceSettings'],
    value: any
  ) => void;
}

export default function CustomRecurrenceDialog({
  isOpen,
  setIsOpen,
  recurrenceSettings,
  updateRecurrenceSettings,
}: CustomRecurrenceDialogProps) {
  const weekDays = [
    { label: 'S', value: 'sunday' },
    { label: 'M', value: 'monday' },
    { label: 'T', value: 'tuesday' },
    { label: 'W', value: 'wednesday' },
    { label: 'T', value: 'thursday' },
    { label: 'F', value: 'friday' },
    { label: 'S', value: 'saturday' },
  ];

  const toggleDay = (day: string) => {
    const newSelectedDays = recurrenceSettings.selectedDays.includes(day)
      ? recurrenceSettings.selectedDays.filter((d) => d !== day)
      : [...recurrenceSettings.selectedDays, day];

    console.log(newSelectedDays);

    updateRecurrenceSettings('selectedDays', newSelectedDays);
    console.log(recurrenceSettings.selectedDays);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Recurrencia Personalizada</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='flex items-center gap-2'>
            <span className='min-w-[90px]'>Repetir cada</span>
            <Input
              type='number'
              min='1'
              className='w-20 bg-white text-center dark:bg-dark-secondary'
              value={recurrenceSettings.interval}
              onChange={(e) =>
                updateRecurrenceSettings('interval', Number(e.target.value))
              }
            />
            <Select
              value={recurrenceSettings.repeatUnit}
              onValueChange={(value) =>
                updateRecurrenceSettings('repeatUnit', value)
              }
            >
              <SelectTrigger className='w-[180px] bg-white text-text-primary dark:bg-dark-secondary'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='day'>día</SelectItem>
                <SelectItem value='week'>semana</SelectItem>
                <SelectItem value='month'>mes</SelectItem>
                <SelectItem value='year'>año</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {recurrenceSettings.repeatUnit === 'week' && (
            <div className='space-y-2'>
              <span>Repetir en</span>
              <div className='flex gap-1'>
                {weekDays.map((day) => {
                  const isSelected = recurrenceSettings.selectedDays.includes(
                    day.value
                  );
                  console.log(isSelected);
                  return (
                    <Button
                      key={day.value}
                      variant={isSelected ? 'default' : 'outline'}
                      className='w-10 p-0'
                      onClick={() => toggleDay(day.value)}
                    >
                      {day.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          <div className='space-y-4'>
            <span>Termina</span>
            <RadioGroup
              value={recurrenceSettings.endType}
              onValueChange={(value) =>
                updateRecurrenceSettings('endType', value)
              }
              className='space-y-2'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='never' id='never' />
                <Label htmlFor='never'>Nunca</Label>
              </div>

              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='on' id='on' />
                <Label htmlFor='on'>En fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className={cn(
                        'w-[180px] justify-start bg-white text-left font-normal dark:bg-dark-secondary dark:hover:bg-dark-text-secondary',
                        !recurrenceSettings.endDate && 'text-muted-foreground'
                      )}
                      disabled={recurrenceSettings.endType !== 'on'}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {recurrenceSettings.endDate
                        ? format(recurrenceSettings.endDate, 'PPP')
                        : 'Seleccionar fecha'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={recurrenceSettings.endDate}
                      onSelect={(date) =>
                        updateRecurrenceSettings('endDate', date)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value='after_occurrences'
                  id='after_occurrences'
                />
                <Label htmlFor='after_occurrences'>Después de</Label>
                <Input
                  type='number'
                  min='1'
                  className='w-20 bg-white dark:bg-dark-secondary'
                  value={recurrenceSettings.occurrences}
                  onChange={(e) =>
                    updateRecurrenceSettings('occurrences', e.target.value)
                  }
                  disabled={recurrenceSettings.endType !== 'after_occurrences'}
                />
                <span>ocurrencias</span>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setIsOpen(false)}>Aceptar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
