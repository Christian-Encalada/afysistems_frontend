import { IoMdTrash } from 'react-icons/io';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog-client';
import { t } from 'i18next';

export default function DeleteTemplate({ onDelete }: { onDelete: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className='rounded-lg p-2 text-text-primary hover:bg-red-400 dark:text-text-secondary hover:dark:bg-red-500'>
          <IoMdTrash />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-text-primary dark:text-text-secondary'>
            {t('templates:delete_sure')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('templates:delete_message')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='dark:bg-dark-secondary dark:hover:bg-dark-text-secondary'>
            {t('templates:cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className='bg-bg-primary hover:bg-purple-500/80 dark:bg-text-secondary dark:hover:bg-dark-text-primary'
          >
            {t('templates:delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
