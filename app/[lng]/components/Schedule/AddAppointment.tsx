import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import moment from 'moment-timezone';
import { useEffect, useState, useMemo } from 'react';
import { Button } from '../ui/buttonClient';
import { getClients } from '../../services/clientsService';
import { useDebounce } from 'use-debounce';
import ClientSelector from './ClientSelector';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '../ui/selectClient';
import { createAppointment } from '@/[lng]/services/appointmentService';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialogClient';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popoverClient';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendarClient';
import { cn } from '@/utils/utils';
import CustomRecurrenceDialog from './CustomRecurrenceDialog';

interface RecurrenceSettings {
  interval: number;
  repeatUnit: string;
  selectedDays: string[];
  endType: string;
  endDate: Date | undefined;
  occurrences: number;
}

interface AppointmentForm {
  title: string;
  description?: string;
  clientId: string;
  frequency: string;
}

const schema = yup.object().shape({
  title: yup.string().required('El título es obligatorio'),
  clientId: yup.string().required('Seleccione un cliente'),
  frequency: yup.string().required('Seleccione una frecuencia'),
});

export default function AddAppointment({
  selectedDate,
  isOpen,
  setIsOpen,
}: {
  selectedDate: Date | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const defaultRecurrenceSettings = useMemo(
    () => ({
      interval: 1,
      repeatUnit: 'day',
      selectedDays: [],
      endType: 'never',
      endDate: undefined,
      occurrences: 0,
    }),
    []
  );

  const [appointmentDate, setAppointmentDate] = useState<Date | null>(
    selectedDate || null
  );
  const [clientSearch, setClientSearch] = useState('');
  const [filteredClients, setFilteredClients] = useState<
    { id: string; name: string; document: string }[]
  >([]);
  const [debouncedClientSearch] = useDebounce(clientSearch, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [frequency, setFrequency] = useState('no_repeat');
  const [isCustomRecurrenceOpen, setIsCustomRecurrenceOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [recurrenceSettings, setRecurrenceSettings] =
    useState<RecurrenceSettings>(defaultRecurrenceSettings);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AppointmentForm>({
    resolver: yupResolver(schema),
  });

  const selectedClient = watch('clientId');

  const updateRecurrenceSettings = (
    key: keyof RecurrenceSettings,
    value: any
  ) => {
    setRecurrenceSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmit: SubmitHandler<AppointmentForm> = async (data) => {
    const appointmentData: any = {
      ...data,
      startDate: moment(appointmentDate).toISOString(),
      startTime: moment(appointmentDate).format('HH:mm'),
      notificationMethod: notifications,
      startRange: moment().startOf('month').format('YYYY-MM-DD'),
      endRange: moment().endOf('month').format('YYYY-MM-DD'),
    };

    if (frequency === 'custom') {
      appointmentData.recurrenceRule = {
        interval: recurrenceSettings.interval,
        frequencyType: recurrenceSettings.repeatUnit,
        daysOfWeek:
          recurrenceSettings.selectedDays.length === 0
            ? undefined
            : recurrenceSettings.selectedDays,
        endType:
          recurrenceSettings.endType === 'on'
            ? 'on_date'
            : recurrenceSettings.endType,
        endDate:
          recurrenceSettings.endType === 'on'
            ? recurrenceSettings.endDate?.toISOString()
            : undefined,
        occurrences:
          recurrenceSettings.endType === 'after_occurrences'
            ? recurrenceSettings.occurrences
            : undefined,
      };

      appointmentData.recurrenceRule = Object.fromEntries(
        Object.entries(appointmentData.recurrenceRule).filter(
          ([, value]) => value !== undefined && value !== '' && value !== 0
        )
      );
    }

    try {
      await createAppointment(appointmentData);
      toast.success('Cita creada exitosamente');
      setIsOpen(false);
    } catch (error) {
      console.error('Error creando la cita:', error);
      toast.error('Error creando la cita');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setValue('title', '');
      setValue('clientId', '');
      setFrequency('no_repeat');
      setNotifications([]);
      setRecurrenceSettings(defaultRecurrenceSettings);
    }
  }, [isOpen, setValue, defaultRecurrenceSettings]);

  useEffect(() => {
    const fetchClients = async (searchQuery: string) => {
      setIsSearching(true);
      try {
        const response = await getClients(1, 25, { document: searchQuery });
        setFilteredClients(
          response.ClientsPaginated.data.map((client: any) => ({
            id: client.id,
            name: `${client.name} ${client.lastName}`,
            document: client.document,
          }))
        );
      } catch (error) {
        console.error('Error buscando clientes:', error);
      } finally {
        setIsSearching(false);
      }
    };

    if (debouncedClientSearch) {
      fetchClients(debouncedClientSearch);
    } else {
      setFilteredClients([]);
    }
  }, [debouncedClientSearch]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Agregar Nueva Cita</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 py-4'>
          <div className='space-y-2'>
            <h4 className='font-medium'>Título de la Cita</h4>
            <Input
              {...register('title')}
              placeholder='Escriba el título de la cita'
              className='border bg-white dark:bg-dark-secondary'
            />
            {errors.title && (
              <p className='text-xs text-red-500'>{errors.title.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <h4 className='font-medium'>Descripción de la Cita</h4>
            <Textarea
              {...register('description')}
              placeholder='Escriba la descripción de la cita'
              className='min-h-[100px] bg-white dark:bg-dark-secondary'
            />
          </div>

          <ClientSelector
            clientSearch={clientSearch}
            setClientSearch={setClientSearch}
            isSearching={isSearching}
            filteredClients={filteredClients}
            selectedClient={selectedClientId}
            setSelectedClient={(client) => {
              setSelectedClientId(client);
              setValue('clientId', client?.id || '');
            }}
            searchError={
              errors.clientId ? errors.clientId.message ?? null : null
            }
          />

          <div className='space-y-2'>
            <h4 className='font-medium'>Fecha y Hora</h4>
            <div className='col-span-3 flex gap-2'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'w-[250px] justify-start text-left font-normal dark:bg-dark-secondary dark:hover:bg-dark-text-secondary',
                      !appointmentDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {appointmentDate
                      ? moment(appointmentDate).format('YYYY-MM-DD')
                      : 'Seleccionar fecha'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={appointmentDate || undefined}
                    onSelect={(date) => date && setAppointmentDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input
                type='time'
                value={moment(appointmentDate).format('HH:mm')}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':');
                  const updatedDate = moment(appointmentDate)
                    .hours(Number(hours))
                    .minutes(Number(minutes))
                    .toDate();
                  setAppointmentDate(updatedDate);
                }}
                className='flex w-[150px] dark:bg-dark-secondary dark:hover:bg-dark-text-secondary'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <h4 className='font-medium'>Frecuencia</h4>
            <Select
              value={frequency}
              onValueChange={(value) => {
                setFrequency(value);
                if (value === 'custom') {
                  setIsCustomRecurrenceOpen(true);
                }
              }}
            >
              <SelectTrigger className='bg-white text-text-primary dark:bg-dark-secondary'>
                <SelectValue placeholder='Seleccionar frecuencia' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='no_repeat'>No repetir</SelectItem>
                <SelectItem value='daily'>Diariamente</SelectItem>
                <SelectItem value='weekly'>Semanalmente</SelectItem>
                <SelectItem value='monthly'>Mensualmente</SelectItem>
                <SelectItem value='yearly'>Anualmente</SelectItem>
                <SelectItem value='custom'>Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <h4 className='font-medium'>Método de Notificación</h4>
            <div className='flex gap-4'>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='whatsapp'
                  checked={notifications.includes('whatsapp')}
                  onCheckedChange={(checked) => {
                    setNotifications((prev) =>
                      checked
                        ? [...prev, 'whatsapp']
                        : prev.filter((m) => m !== 'whatsapp')
                    );
                  }}
                />
                <label htmlFor='whatsapp' className='text-sm'>
                  WhatsApp
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='email'
                  checked={notifications.includes('email')}
                  onCheckedChange={(checked) => {
                    setNotifications((prev) =>
                      checked
                        ? [...prev, 'email']
                        : prev.filter((m) => m !== 'email')
                    );
                  }}
                />
                <label htmlFor='email' className='text-sm'>
                  Email
                </label>
              </div>
            </div>
          </div>

          <Button className='w-full' type='submit'>
            Guardar Cita
          </Button>
        </form>
      </DialogContent>
      <CustomRecurrenceDialog
        isOpen={isCustomRecurrenceOpen}
        setIsOpen={setIsCustomRecurrenceOpen}
        recurrenceSettings={recurrenceSettings}
        updateRecurrenceSettings={updateRecurrenceSettings}
      />
    </Dialog>
  );
}
