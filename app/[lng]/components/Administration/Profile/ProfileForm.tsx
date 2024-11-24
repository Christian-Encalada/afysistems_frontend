'use client';

import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { IFormUpdateProfile } from '@/types/forms';
import { updateProfile } from '@/[lng]/services/profileService';
import SelectDropdown from '@/[lng]/components/TemplateSelectDropdown';
import { getAllCountries } from '../../../services/countryService';
import { getALlProvinces } from '../../../services/provinceService';
import { getAllCantonsByProvince } from '../../../services/cantonService';
import { getAllParishes } from '../../../services/parishService';
import { useTranslation } from '@/i18n/client';
import SkeletonForm from '../../SkeletonForm'; 
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialogClient';
import { toast } from 'react-toastify';

interface ProfileFormProps {
  profileData: IFormUpdateProfile;
  lng: string;
  reloadData: () => void;
}

export default function ProfileForm({ profileData, lng, reloadData }: ProfileFormProps) {
  const { t } = useTranslation(lng, 'administration');
  
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cantons, setCantons] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const statusOptions = [
    { id: true, name: t('active') },
    { id: false, name: t('inactive') }
  ];

  const roleOptions = [
    { id: 'super admin', name: t('roles_super_admin') },
    { id: 'admin', name: t('roles_admin') },
    { id: 'assistant', name: t('roles_assistant') },
  ];

  const schema = yup.object().shape({
    username: yup.string().required(t('error_username')),
    email: yup.string().email(t('invalid_email')).required(t('error_email')),
    role: yup.string().required(t('error_role')),
    document: yup.string(),
    phone: yup.string(),
    direction: yup.string(),
    countryId: yup.number().required(t('select_country')),
    provinceId: yup.number().required(t('select_province')),
    cantonId: yup.number().required(t('select_canton')),
    parishId: yup.number().required(t('select_parish')),
    status: yup.boolean().required(t('error_status'))
  });

  const { register, handleSubmit, formState: { errors }, reset, watch, control } = useForm<IFormUpdateProfile>({
    resolver: yupResolver(schema),
    defaultValues: profileData,
  });

  // Verificamos los cambios
  const watchValues = useWatch({ control });
  useEffect(() => {
    const hasFormChanged = JSON.stringify(watchValues) !== JSON.stringify(profileData);
    setHasChanges(hasFormChanged);
  }, [watchValues, profileData]);

  const selectedCountry = watch('countryId', profileData?.countryId);
  const selectedProvince = watch('provinceId', profileData?.provinceId);
  const selectedCanton = watch('cantonId', profileData?.cantonId);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getAllCountries();
        setCountries(response);
      } catch (error: any) {
        console.error('Error fetching countries:', error);
      }
    };

    const fetchProvinces = async () => {
      if (selectedCountry) {
        const response = await getALlProvinces(selectedCountry);
        setProvinces(response);
      }
    };

    const fetchCantons = async () => {
      if (selectedProvince) {
        const response = await getAllCantonsByProvince(selectedProvince);
        setCantons(response);
      }
    };

    const fetchParishes = async () => {
      if (selectedCanton) {
        const response = await getAllParishes(selectedCanton);
        setParishes(response);
      }
    };

    const fetchData = async () => {
      await fetchCountries();
      if (selectedCountry) await fetchProvinces();
      if (selectedProvince) await fetchCantons();
      if (selectedCanton) await fetchParishes();

      setLoading(false);
    };

    fetchData();
  }, [selectedCountry, selectedProvince, selectedCanton, profileData]);

  useEffect(() => {
    if (profileData) {
      reset({
        ...profileData,
        countryId: profileData.countryId,
        provinceId: profileData.provinceId,
        cantonId: profileData.cantonId,
        parishId: profileData.parishId,
      });
    }
  }, [profileData, reset]);

  const onSubmit: SubmitHandler<IFormUpdateProfile> = async (data) => {
    setSubmitting(true);
    try {
      await updateProfile(data);
      setSuccess(true);
      setShowDialog(false);
      toast.success(t('profile_updated'), { autoClose: 2000 });
      reloadData();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error updating profile:', error.message);
        toast.error(`Error: ${error.message}`);
      } else {
        console.error('Unexpected error', error);
        toast.error(t('unexpected_error'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <SkeletonForm rows={8} />;
  }

  const handleSave = () => {
    if (hasChanges) {
      setShowDialog(true);
    }
  };

  return (
    <div className='mt-8'>
      {success && (
        <div className='bg-green-100 text-green-700 p-4 mb-4 rounded'>
          {t('profile_updated')}
        </div>
      )}
  
      <div className='bg-white dark:bg-dark-secondary shadow-md rounded-lg p-8'>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-y-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6'>
          <div className='form-group mb-5'>
            <label className='mb-2 block'>{t('username')}</label>
            <input
              {...register('username', { required: true })}
              className='w-full rounded-md bg-white dark:bg-dark-secondary dark:text-dark-text-primary border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm'
            />
            {errors.username && <span className='text-red-500'>{t('error_username')}</span>}
          </div>
  
          <div className='form-group mb-5'>
            <label className='mb-2 block'>{t('email')}</label>
            <input
              {...register('email', { required: true })}
              type='email'
              className='w-full rounded-md bg-white dark:bg-dark-secondary dark:text-dark-text-primary border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm'
            />
            {errors.email && <span className='text-red-500'>{t('error_email')}</span>}
          </div>
  
          <div className='form-group mb-5'>
            <label className='mb-2 block'>{t('status')}</label>
            <SelectDropdown
              items={statusOptions}
              fieldName='status'
              register={register}
              lng={lng}
              placeholder={t('select_status')}
              selectedValue={profileData.status}
            />
          </div>
  
          <div className='form-group mb-5'>
            <label className='mb-2 block'>{t('role')}</label>
            <SelectDropdown
              items={roleOptions}
              fieldName='role'
              register={register}
              lng={lng}
              placeholder={t('select_role')}
              selectedValue={profileData.role}
            />
          </div>
  
          <div className='form-group mb-5'>
            <label className='mb-2 block'>{t('phone')}</label>
            <input
              {...register('phone')}
              className='w-full rounded-md bg-white dark:bg-dark-secondary dark:text-dark-text-primary border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm'
            />
          </div>
  
          <div className='form-group mb-5'>
            <label className='mb-2 block'>{t('direction')}</label>
            <input
              {...register('direction')}
              className='w-full rounded-md bg-white dark:bg-dark-secondary dark:text-dark-text-primary border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm'
            />
          </div>
  
          <div className='form-group mb-5'>
            <label className='mb-2 block'>{t('country')}</label>
            <SelectDropdown
              items={countries}
              fieldName='countryId'
              register={register}
              lng={lng}
              placeholder={t('select_country')}
              selectedValue={profileData.countryId}
            />
          </div>
  
          <div className='form-group mb-5'>
            <label className='mb-2 block'>{t('province')}</label>
            <SelectDropdown
              items={provinces}
              fieldName='provinceId'
              register={register}
              lng={lng}
              placeholder={t('select_province')}
              selectedValue={profileData.provinceId}
            />
          </div>
  
          <div className='form-group mb-5'>
            <label className='mb-2 block'>{t('canton')}</label>
            <SelectDropdown
              items={cantons}
              fieldName='cantonId'
              register={register}
              lng={lng}
              placeholder={t('select_canton')}
              selectedValue={profileData.cantonId}
            />
          </div>
  
          <div className='form-group mb-5'>
            <label className='mb-2 block'>{t('parish')}</label>
            <SelectDropdown
              items={parishes}
              fieldName='parishId'
              register={register}
              lng={lng}
              placeholder={t('select_parish')}
              selectedValue={profileData.parishId}
            />
          </div>
  
          {/* El texto para cambiar la contraseña */}
          <div className='sm:col-span-2 flex justify-between items-center mt-5'>
            {/* Texto y enlace */}
            <p className='text-sm text-gray-700 dark:text-gray-400'>
              {t('change_password')}{' '}
              <a
                href='/es/dashboard/administration/password/manage'
                className='text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline'
              >
                {t('click_here')}
              </a>
            </p>
  
          {/* Botón de guardar */}
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <button
                type='button'
                onClick={handleSave}
                disabled={!hasChanges}
                className={`flex items-center justify-center gap-3 rounded-lg px-3 py-2 text-sm sm:px-4 sm:py-3 ${
                  hasChanges
                    ? 'bg-bg-primary text-text-secondary dark:bg-dark-primary dark:text-dark-text-white'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                {loading ? 'Loading...' : t('save')}
              </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('confirm_changes')}</DialogTitle>
                </DialogHeader>
                <p>{t('are_you_sure_to_update')}</p>
                <DialogFooter className='flex justify-between'>
                  <button
                    type='button'
                    className='rounded-md bg-red-500 text-white px-4 py-2 dark:bg-red-400 dark:hover:bg-red-300'
                    onClick={() => setShowDialog(false)}
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type='button'
                    className='rounded-md bg-blue-600 text-white px-4 py-2 dark:bg-sky-600 dark:hover:bg-sky-500'
                    onClick={handleSubmit(onSubmit)}
                    disabled={submitting}
                  >
                    {submitting ? t('updating') : t('accept')}
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </div>
    </div>
  );
} 