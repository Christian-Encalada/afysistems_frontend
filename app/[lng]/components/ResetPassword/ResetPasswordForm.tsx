'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IFormResetPassword } from '@/types/forms';
import styles from '../../styles/requestPassword.module.css';
import { useTranslation } from '@/i18n/client';
import { resetPassword } from '../../services/authService';
import { toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';
import SmallLoader from '../SmallLoader';
import { StatusCodes } from 'http-status-codes';

const ResetPasswordForm: React.FC<{ lng: string }> = ({ lng }) => {
  const { t } = useTranslation(lng, 'resetPassword');
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const pathParts = pathname.split('/');
    const tokenFromPath = pathParts[pathParts.length - 1];
    setResetToken(tokenFromPath);
  }, [pathname]);

  const schema = yup.object().shape({
    password: yup
      .string()
      .required(t('error_pass'))
      .min(6, t('error_pass_min')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], t('error_pass_match'))
      .required(t('error_confirm_pass')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormResetPassword>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormResetPassword> = async (data) => {
    if (!resetToken) {
      toast.error(t('error_invalid_token'));
      return;
    }

    try {
      setLoading(true);
      const response = await resetPassword(resetToken, data.password, lng);
      if (response) {
        setIsSuccess(true);
        toast.success(t('reset_success'));
      }
    } catch (error: any) {
      if (error.response?.status === StatusCodes.NOT_FOUND) {
        toast.error(t('error_pass_already_reset'));
      } else {
        toast.error(t('error_reset'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full flex-col gap-5 rounded-xl bg-text-secondary p-7 text-text-primary shadow-xl'
    >
      <label>{t('new_pass_form')}</label>
      <input
        type='password'
        className={`${styles.input}`}
        {...register('password')}
      />
      {errors.password && (
        <p className='text-xs font-semibold text-red-600'>
          {errors.password.message}
        </p>
      )}
      <label>{t('confirm_pass_form')}</label>
      <input
        type='password'
        className={`${styles.input}`}
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && (
        <p className='text-xs font-semibold text-red-600'>
          {errors.confirmPassword.message}
        </p>
      )}
      <p className='text-sm font-light'>{t('message_password')}</p>
      {isSuccess ? (
        <div className='mt-3 rounded-md border-2 p-4 text-text-primary shadow-md'>
          <p className='gap text-sm font-normal text-text-primary'>
            {t('message_succes')}
          </p>
          <button
            type='button'
            onClick={() => router.push(`/login`)}
            className='mt-5 w-full rounded-lg bg-bg-primary py-3 text-text-secondary shadow-lg'
          >
            {t('btn_back_login')}
          </button>
        </div>
      ) : (
        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-lg bg-bg-primary py-3 text-text-secondary shadow-lg'
        >
          {loading ? <SmallLoader /> : t('btn_form')}
        </button>
      )}
    </form>
  );
};

{
  /* <button 
onClick={() => router.push(`/login`)}
className='w-full rounded-lg bg-bg-primary py-3 text-text-secondary shadow-lg'
>
{t('btn_success')}
</button> */
}

export default ResetPasswordForm;
