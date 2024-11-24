'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialogClient';
import { MdAddCircle } from 'react-icons/md';
import { useTranslation } from '@/i18n/client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IFormCreateClient } from '@/types/forms';
import { createClient } from '../../services/clientsService';
import ClientForm from './ClientForm';
import SmallLoader from '../SmallLoader';

export default function NewClientDialog({
  lng,
  reloadData,
}: {
  lng: string;
  reloadData: () => void;
}) {
  const { t } = useTranslation(lng, 'clients');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: IFormCreateClient, resetForm: any) => {
    setLoading(true);
    try {
      const response = await createClient(data);
      if (response) {
        toast.success(t('client_created'), { autoClose: 2000 });
        reloadData();
        setIsOpen(false);
      }
      resetForm();
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            onClick={() => setIsOpen(true)}
            className='dark:text-dark-text-white flex items-center justify-center gap-3 rounded-lg bg-bg-primary px-3 py-2 text-sm text-text-secondary dark:bg-dark-primary sm:px-4 sm:py-3'
          >
            <MdAddCircle className='hidden h-5 w-5 sm:block' />
            {t('new_client')}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-text-primary dark:text-dark-text-primary'>
              {t('new_client')}
            </DialogTitle>
            <DialogDescription>{t('new_client_description')}</DialogDescription>
          </DialogHeader>
          <ClientForm
            onSubmit={(data, reset) => onSubmit(data, reset)}
            lng={lng}
          />
          <DialogFooter>
            <button
              disabled={loading}
              form='form'
              type='submit'
              className='dark:text-dark-text-white rounded-xl bg-bg-primary px-5 py-3 text-sm text-text-secondary hover:bg-opacity-95 dark:bg-[#101019] hover:dark:bg-opacity-40'
            >
              {loading ? <SmallLoader /> : t('create')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
