'use client';

import { useState } from 'react';
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
import SmallLoader from '../SmallLoader';
import { deleteClient } from '../../services/clientsService';
import { toast } from 'react-toastify';

export default function DelateClient({
  clientId,
  reloadData,
}: {
  clientId: number;
  reloadData: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteClient(clientId);
      if (response) {
        toast.success(response.message, { autoClose: 2000 });
        reloadData();
        setIsOpen(false);
      }
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`, {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button
          className='rounded-lg p-2 text-text-primary hover:bg-red-400 dark:text-text-secondary hover:dark:bg-red-500'
          onClick={() => setIsOpen(true)}
        >
          <IoMdTrash />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-text-primary dark:text-text-secondary'>
            {t('clients:delete_sure')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('clients:delete_message')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='dark:bg-dark-secondary dark:hover:bg-dark-text-secondary'>
            {t('clients:cancel')}
          </AlertDialogCancel>

          <button
            onClick={handleDelete}
            disabled={loading}
            className='inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-bg-primary px-4 py-2 text-sm font-medium text-slate-50 hover:bg-purple-500/80 disabled:pointer-events-none disabled:opacity-50 dark:bg-text-secondary dark:text-slate-900 dark:hover:bg-dark-text-primary dark:disabled:bg-slate-700'
          >
            {loading ? <SmallLoader /> : t('clients:delete')}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
