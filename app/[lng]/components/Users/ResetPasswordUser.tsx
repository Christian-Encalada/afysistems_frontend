'use client';

import { MdLock } from 'react-icons/md';
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
import { resetUserPassword } from '@/[lng]/services/usersService';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from '@/i18n/client';

interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}
export default function ResetPasswordUser({
  userId,
  reloadData,
  lng,
}: {
  userId: number;
  reloadData: () => void;
  lng: string;
}) {
  const { t } = useTranslation(lng, 'users');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  const onSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
    setLoading(true);
    try {
      await resetUserPassword(userId, data.newPassword);
      toast.success(t('password_reset_success') as string, { autoClose: 2000 });
      reloadData();
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const newPassword = watch('newPassword');

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className='rounded-lg p-2 text-text-primary hover:bg-bg-primary-opacity dark:text-text-secondary hover:dark:bg-dark-secondary'>
            <MdLock />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-text-primary dark:text-dark-text-primary'>
              {t('reset_password')}
            </DialogTitle>
            <DialogDescription>
              {t('reset_password_description')}
            </DialogDescription>
          </DialogHeader>
          <form id='reset-password-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                {t('new_password')}
              </label>
              <input
                type='password'
                {...register('newPassword', { required: true })}
                className='rounded-lg bg-bg-primary-opacity px-3 py-3 text-sm text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary'
                required
              />
              {errors.newPassword && (
                <p className='text-xs text-red-500'>{t('password_required')}</p>
              )}
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                {t('confirm_password')}
              </label>
              <input
                type='password'
                {...register('confirmPassword', {
                  required: true,
                  validate: (value) =>
                    value === newPassword || t('passwords_do_not_match'),
                })}
                className='rounded-lg bg-bg-primary-opacity px-3 py-3 text-sm text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary'
                required
              />
              {errors.confirmPassword && (
                <p className='text-xs text-red-500'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </form>
          <DialogFooter>
            <button
              disabled={loading}
              form='reset-password-form'
              type='submit'
              className='dark:text-dark-text-white rounded-xl bg-bg-primary px-5 py-3 text-sm text-text-secondary hover:bg-opacity-95 dark:bg-[#101019] hover:dark:bg-opacity-40'
            >
              {loading ? <SmallLoader /> : t('accept')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
