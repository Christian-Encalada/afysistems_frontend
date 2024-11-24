import { Checkbox } from '../ui/checkbox';

export default function NotificationsSelector({
  notifications,
  setNotifications,
}: {
  notifications: string[];
  setNotifications: (value: string[] | ((prev: string[]) => string[])) => void;
}) {
  const handleNotificationChange = (notification: string) => {
    setNotifications((prev: string[]) => {
      if (prev.includes(notification)) {
        return prev.filter((n: string) => n !== notification);
      }
      return [...prev, notification];
    });
  };

  return (
    <div className='space-y-2'>
      <label className='font-normal text-text-primary dark:font-light dark:text-text-secondary'>
        Método de Notificación
      </label>
      <div className='flex gap-4 space-y-1'>
        <div className='flex items-center gap-1 text-sm'>
          <Checkbox
            id='whatsapp'
            checked={notifications.includes('whatsapp')}
            onCheckedChange={() => handleNotificationChange('whatsapp')}
          />
          <label
            htmlFor='whatsapp'
            className='text-text-primary dark:text-dark-text-primary'
          >
            WhatsApp
          </label>
        </div>
        <div className='flex items-center gap-1 text-sm'>
          <Checkbox
            id='email'
            checked={notifications.includes('email')}
            onCheckedChange={() => handleNotificationChange('email')}
          />
          <label
            htmlFor='email'
            className='text-text-primary dark:text-dark-text-primary'
          >
            Email
          </label>
        </div>
      </div>
    </div>
  );
}
