'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { changePassword } from '@/[lng]/services/authService';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { GoEye, GoEyeClosed } from "react-icons/go";
import SmallLoader from '../../SmallLoader';


interface ChangePasswordFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function PasswordForm({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'administration');
  const [submitting, setSubmitting] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const schema = yup.object().shape({
    currentPassword: yup.string().required(t('password_current_required')),
    newPassword: yup
      .string()
      .required(t('password_new_required'))
      .min(6, t('password_new_min')),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), undefined], t('password_confirm_mismatch'))
      .required(t('password_confirm_required')),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFormInputs> = async (data) => {
    setSubmitting(true);
    try {
      await changePassword(data.currentPassword, data.newPassword);
      toast.success(t('password_change_success'), { autoClose: 2000 });
      toast.info(t('password_change_email_sent'), { autoClose: 3000 });

      setFormVisible(false);
      setTimeout(() => {
        reset();
        setFormVisible(true);
      }, 500);
      
    } catch (error) {
      toast.error(t('password_change_error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={`space-y-4 bg-white dark:bg-dark-secondary shadow-md rounded-lg p-6 sm:max-w-md mx-auto transition-opacity duration-500 ${formVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Campo Contraseña Actual */}
      <div className="relative">
        <label>{t('password_current')}</label>
        <input
          type={showCurrentPassword ? "text" : "password"}
          {...register('currentPassword')}
          className="w-full rounded-md bg-white dark:bg-dark-secondary border border-slate-300 px-4 py-2 pr-10"
        />
        {/* Espacio reservado para el mensaje de error */}
        <div className="h-6">
          {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
        </div>
        
        {/* Icono de visibilidad */}
        <span
          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black dark:text-gray-300 transition-transform hover:scale-110"
        >
          {showCurrentPassword ? <GoEye size={17} /> : <GoEyeClosed size={17} />}
        </span>
      </div>
    
      {/* Campo Nueva Contraseña */}
      <div className="relative">
        <label>{t('password_new')}</label>
        <input
          type={showNewPassword ? "text" : "password"}
          {...register('newPassword')}
          className="w-full rounded-md bg-white dark:bg-dark-secondary border border-slate-300 px-4 py-2 pr-10"
        />
        {/* Espacio reservado para el mensaje de error */}
        <div className="h-6">
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
        </div>
        
        {/* Icono de visibilidad */}
        <span
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black dark:text-gray-300 transition-transform hover:scale-110"
        >
          {showNewPassword ? <GoEye size={17} /> : <GoEyeClosed size={17} />}
        </span>
      </div>
    
      {/* Campo Confirmar Nueva Contraseña */}
      <div className="relative">
        <label>{t('password_confirm')}</label>
        <input
          type={showConfirmNewPassword ? "text" : "password"}
          {...register('confirmNewPassword')}
          className="w-full rounded-md bg-white dark:bg-dark-secondary border border-slate-300 px-4 py-2 pr-10"
        />
        {/* Espacio reservado para el mensaje de error */}
        <div className="h-6">
          {errors.confirmNewPassword && <p className="text-red-500 text-sm">{errors.confirmNewPassword.message}</p>}
        </div>
        
        {/* Icono de visibilidad */}
        <span
          onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black dark:text-gray-300 transition-transform hover:scale-110"
        >
          {showConfirmNewPassword ? <GoEye size={17} /> : <GoEyeClosed size={17} />}
        </span>
      </div>
    
      <div className="text-center">
        <button
          type="submit"
          className={`w-64 py-2 mt-4 rounded-md text-sm sm:px-4 sm:py-3 transition-colors duration-300 ${
            submitting
              ? 'bg-bg-primary-opacity dark:bg-dark-primary-opacity text-transparent cursor-default'
              : 'bg-bg-primary text-text-secondary dark:bg-dark-primary dark:text-dark-text-white'
          }`}
          disabled={submitting}
        >
          {submitting ? (
            <div className="flex justify-center items-center">
              <SmallLoader />
            </div>
          ) : (
            t('password_change_button')
          )}
        </button>
      </div>
    </form>
  );
}
