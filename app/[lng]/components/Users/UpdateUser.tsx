'use client';
import { MdEdit } from 'react-icons/md';
import SmallLoader from '../SmallLoader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialogClient';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateUser } from '@/[lng]/services/usersService';
import { IFormUpdateUser } from '@/types/forms';
import UpdateUserForm from './UpdateUserForm';
import { useTranslation } from '@/i18n/client';

export default function UpdateUser({
  userData,
  reloadData,
  lng,
}: {
  userData: any;
  reloadData: () => void;
  lng: string;
}) {
  const { t } = useTranslation(lng, 'users');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IFormUpdateUser) => {
    setLoading(true);
    try {
      const response = await updateUser(userData.id ?? 0, data);
      if (response) {
        toast.success(t('user_updated'), { autoClose: 2000 });
        reloadData();
      }
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
          <button className='rounded-lg p-2 text-text-primary hover:bg-bg-primary-opacity dark:text-text-secondary hover:dark:bg-dark-secondary'>
            <MdEdit />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-text-primary dark:text-dark-text-primary'>
              {t('update_user')}
            </DialogTitle>
            <DialogDescription>
              {t('update_user_description')}
            </DialogDescription>
          </DialogHeader>
          <UpdateUserForm
            initialData={userData}
            onSubmit={onSubmit}
            lng={lng}
          />
          <DialogFooter>
            <button
              disabled={loading}
              form='form'
              type='submit'
              className='dark:text-dark-text-white rounded-xl bg-bg-primary px-5 py-3 text-sm text-text-secondary hover:bg-opacity-95 dark:bg-[#101019] hover:dark:bg-opacity-40'
            >
              {loading ? <SmallLoader /> : t('update')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
