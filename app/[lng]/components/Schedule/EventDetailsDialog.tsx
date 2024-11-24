import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialogClient';
import moment from 'moment-timezone';

interface EventDetailsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  event: any;
}

export default function EventDetailsDialog({
  isOpen,
  setIsOpen,
  event,
}: EventDetailsProps) {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='bg-white dark:bg-dark-primary sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-text-primary dark:text-dark-text-primary'>
            Detalles de la Cita
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4 text-text-primary dark:text-dark-text-primary'>
          <div>
            <h4 className='mb-1 font-medium'>Título</h4>
            <p>{event.title}</p>
          </div>

          <div>
            <h4 className='mb-1 font-medium'>Fecha y Hora</h4>
            <p>{moment(event.start).format('DD/MM/YYYY HH:mm')}</p>
          </div>

          {event.extendedProps.description && (
            <div>
              <h4 className='mb-1 font-medium'>Descripción</h4>
              <p>{event.extendedProps.description}</p>
            </div>
          )}

          {event.extendedProps.isRecurring && (
            <div>
              <h4 className='mb-1 font-medium'>Recurrencia</h4>
              <p className='flex items-center'>
                <span className='mr-2'>↻</span>
                Evento recurrente
              </p>
            </div>
          )}

          <div>
            <h4 className='mb-1 font-medium'>Notificaciones</h4>
            <div className='flex gap-2'>
              {event.extendedProps.notificationMethod?.map((method: string) => (
                <span
                  key={method}
                  className='rounded bg-bg-primary-opacity px-2 py-1 text-sm dark:bg-dark-secondary'
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
