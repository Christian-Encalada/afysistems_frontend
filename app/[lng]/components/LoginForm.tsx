'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IFormLogin } from '@/types/forms';
import { useTranslation } from '@/i18n/client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { login } from '../services/authService';
import SmallLoader from './SmallLoader';
import styles from '../styles/login.module.css';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

const LoginFormComponent: React.FC<{ lng: string }> = ({ lng }) => {
  const { t } = useTranslation(lng, 'login');
  const { setAuthContext } = useAuth();
  const router = useRouter();

  const schema = yup.object().shape({
    username: yup.string().required(t('error_user')),
    password: yup.string().required(t('error_pass')),
  });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormLogin> = async (data) => {
    setLoading(true);
    try {
      const response = await login(data, lng);

      if (response) {
        setAuthContext(response.user);
        toast.success(t('login_success'), {
          autoClose: 2000,
        });
        router.push('/dashboard/home');
      } else {
        toast.error(t('error_login'));
      }
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full flex-col gap-5 rounded-xl bg-text-secondary p-7 text-text-primary shadow-xl'
    >
      <h2 className='text-center text-xl font-bold'>{t('title_form')}</h2>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label className='text-lg'>{t('user_form')}</label>
          <input
            className={`${styles.input} dark:bg-text-secondary dark:focus-visible:text-text-primary`}
            {...register('username')}
          />
          {errors.username && (
            <p className='text-xs font-semibold text-red-600'>
              {errors.username.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-lg'>{t('pass_form')}</label>
          <input
            type='password'
            className={`${styles.input} dark:bg-text-secondary`}
            {...register('password')}
          />
          {errors.password && (
            <p className='text-xs font-semibold text-red-600'>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <Link href='/reset-password' className='text-right text-sm'>
            <p className='font-semibold underline'>{t('forget_pass')}</p>
          </Link>
        </div>
      </div>
      <button
        type='submit'
        className='w-full rounded-lg bg-bg-primary py-3 text-text-secondary shadow-lg'
        disabled={loading}
      >
        {loading ? <SmallLoader /> : t('btn_form')}
      </button>
    </form>
  );
};

export default LoginFormComponent;
