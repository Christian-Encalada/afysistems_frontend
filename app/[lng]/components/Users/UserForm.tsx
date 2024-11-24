'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { IFormCreateUser } from '@/types/forms';
import { useTranslation } from '@/i18n/client';
import SelectDropdown from '../SelectDropdown';
import { FIELDS_USER } from '@/utils/constants';
import { getAllCountries } from '../../services/countryService';
import { getALlProvinces } from '../../services/provinceService';
import { getAllCantonsByProvince } from '../../services/cantonService';
import { getAllParishes } from '../../services/parishService';

export default function UserForm({
  onSubmit,
  lng,
  defaultValues,
}: {
  onSubmit: SubmitHandler<IFormCreateUser>;
  lng: string;
  defaultValues?: Partial<any>;
}) {
  const { t } = useTranslation(lng, 'users');

  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cantons, setCantons] = useState([]);
  const [parishes, setParishes] = useState([]);

  const statusOptions = [
    { id: true, name: t('active') },
    { id: false, name: t('inactive') },
  ];

  const roleOptions = [
    { id: 'super admin', name: t('roles_super_admin') },
    { id: 'admin', name: t('roles_admin') },
    { id: 'assistant', name: t('roles_assistant') },
  ];

  const schema = yup.object().shape({
    username: yup.string().required(t('error_username')),
    email: yup.string().email(t('invalid_email')).required(t('error_email')),
    password: yup
      .string()
      .min(6, t('error_password_min'))
      .required(t('error_password')),
    role: yup.string().required(t('error_role')),
    document: yup.string(),
    phone: yup.string(),
    direction: yup.string(),
    countryId: yup.number().required(t('select_country')),
    provinceId: yup.number().required(t('select_province')),
    cantonId: yup.number().required(t('select_canton')),
    parishId: yup.number().required(t('select_parish')),
    status: yup.boolean().required(t('error_status')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormCreateUser>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const selectedCountry = watch('countryId');
  const selectedProvince = watch('provinceId');
  const selectedCanton = watch('cantonId');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getAllCountries();
        setCountries(response);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchProvinces = async () => {
        try {
          const response = await getALlProvinces(selectedCountry);
          setProvinces(response);
        } catch (error: any) {
          console.error(error);
        }
      };
      fetchProvinces();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedProvince) {
      const fetchCantons = async () => {
        try {
          const response = await getAllCantonsByProvince(selectedProvince);
          setCantons(response);
        } catch (error: any) {
          console.error(error);
        }
      };
      fetchCantons();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCanton) {
      const fetchParishes = async () => {
        try {
          const response = await getAllParishes(selectedCanton);
          setParishes(response);
        } catch (error: any) {
          console.error(error);
        }
      };
      fetchParishes();
    }
  }, [selectedCanton]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form
      id='form'
      className='grid gap-y-3 py-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4'
      onSubmit={handleSubmit((data) => onSubmit(data, reset as any))}
    >
      {FIELDS_USER.map((field) => (
        <div key={field} className='relative mb-2 grid gap-2'>
          <label className='text-text-primary dark:text-dark-text-primary'>
            {t(field)}
          </label>
          {field === 'password' ? (
            <input
              type='password'
              {...register('password')}
              className='rounded-lg border border-slate-400 bg-white px-3 py-3 text-sm text-text-primary dark:border-slate-800 dark:bg-dark-secondary dark:text-dark-text-primary dark:placeholder-dark-text-secondary'
            />
          ) : field === 'countryId' ? (
            <SelectDropdown
              items={countries}
              fieldName='countryId'
              register={register}
              lng={lng}
              placeholder={t('select_country')}
            />
          ) : field === 'provinceId' ? (
            <SelectDropdown
              items={provinces}
              fieldName='provinceId'
              register={register}
              lng={lng}
              placeholder={t('select_province')}
            />
          ) : field === 'cantonId' ? (
            <SelectDropdown
              items={cantons}
              fieldName='cantonId'
              register={register}
              lng={lng}
              placeholder={t('select_canton')}
            />
          ) : field === 'parishId' ? (
            <SelectDropdown
              items={parishes}
              fieldName='parishId'
              register={register}
              lng={lng}
              placeholder={t('select_parish')}
            />
          ) : field === 'status' ? (
            <SelectDropdown
              items={statusOptions}
              fieldName='status'
              register={register}
              lng={lng}
              placeholder={t('select_status')}
            />
          ) : field === 'role' ? (
            <SelectDropdown
              items={roleOptions}
              fieldName='role'
              register={register}
              lng={lng}
              placeholder={t('select_role')}
            />
          ) : (
            <input
              type={
                field === 'phone' || field === 'document'
                  ? 'number'
                  : field === 'email'
                    ? 'email'
                    : 'text'
              }
              {...register(field)}
              className='rounded-lg border border-slate-400 bg-white px-3 py-3 text-sm text-text-primary dark:border-slate-800 dark:bg-dark-secondary dark:text-dark-text-primary dark:placeholder-dark-text-secondary'
              onKeyPress={(e) => {
                if (field === 'phone' || field === 'document') {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }
              }}
            />
          )}
          {errors[field] && (
            <p className='absolute bottom-[-20px] left-0 text-xs font-medium text-red-500 dark:text-red-500'>
              {errors[field]?.message}
            </p>
          )}
        </div>
      ))}
    </form>
  );
}
