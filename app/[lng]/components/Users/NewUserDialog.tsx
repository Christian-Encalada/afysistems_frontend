'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/[lng]/components/ui/dialogClient';
import { MdAddCircle } from 'react-icons/md';
import { useTranslation } from '@/i18n/client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IFormCreateUser } from '@/types/forms';
import { createUser } from '@/[lng]/services/usersService';
import UserForm from './UserForm';
import SmallLoader from '../SmallLoader';

export default function NewUserDialog({
  lng,
  reloadData,
}: {
  lng: string;
  reloadData: () => void;
}) {
  const { t } = useTranslation(lng, 'users');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IFormCreateUser, resetForm: any) => {
    setLoading(true);
    try {
      // Convertir campos a números antes de enviar los datos
      const preparedData = {
        ...data,
        countryId: data.countryId ? Number(data.countryId) : undefined,
        provinceId: data.provinceId ? Number(data.provinceId) : undefined,
        cantonId: data.cantonId ? Number(data.cantonId) : undefined,
        parishId: data.parishId ? Number(data.parishId) : undefined,
      };

      const response = await createUser(preparedData);
      if (response) {
        toast.success(t('user_created'), { autoClose: 2000 });
        reloadData();
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
      <Dialog>
        <DialogTrigger asChild>
          <button className='dark:text-dark-text-white flex items-center justify-center gap-3 rounded-lg bg-bg-primary px-4 py-3 text-sm text-text-secondary dark:bg-dark-primary'>
            <MdAddCircle className='h-5 w-5' />
            {t('new_user')}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-text-primary dark:text-dark-text-primary'>
              {t('new_user')}
            </DialogTitle>
            <DialogDescription>{t('new_user_description')}</DialogDescription>
          </DialogHeader>
          <UserForm
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
