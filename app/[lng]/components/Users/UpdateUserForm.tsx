'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { IFormUpdateUser } from '@/types/forms';
import { useTranslation } from '@/i18n/client';
import SelectDropdown from '../SelectDropdown';
import { FIELDS_USER_UPDATE } from '@/utils/constants';
import { getAllCountries } from '../../services/countryService';
import { getALlProvinces } from '../../services/provinceService';
import { getAllCantonsByProvince } from '../../services/cantonService';
import { getAllParishes } from '../../services/parishService';
import SkeletonForm from '../SkeletonForm';

export default function UpdateUserForm({
  onSubmit,
  initialData,
  lng,
}: {
  onSubmit: SubmitHandler<any>;
  initialData?: any;
  lng: string;
}) {
  const { t } = useTranslation(lng, 'users');

  const [loading, setLoading] = useState(true);

  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cantons, setCantons] = useState([]);
  const [parishes, setParishes] = useState([]);

  // Opciones para el campo de estado
  const statusOptions = [
    { id: true, name: t('active') },
    { id: false, name: t('inactive') },
  ];

  // Opciones para el campo de rol
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
    status: yup.boolean().required(t('error_status')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormUpdateUser>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  const selectedCountry = watch('countryId', initialData?.country?.id);
  const selectedProvince = watch('provinceId', initialData?.province?.id);
  const selectedCanton = watch('cantonId', initialData?.canton?.id);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getAllCountries();
        setCountries(response);
      } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
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
  }, [selectedCountry, selectedProvince, selectedCanton, initialData]);

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        countryId: initialData.country?.id,
        provinceId: initialData.province?.id,
        cantonId: initialData.canton?.id,
        parishId: initialData.parish?.id,
      });
    }
  }, [initialData, reset]);

  if (loading) {
    return <SkeletonForm rows={FIELDS_USER_UPDATE.length} />;
  }

  return (
    <form
      id='form'
      className='grid grid-cols-2 gap-x-6 gap-y-4 py-4'
      onSubmit={handleSubmit((data) => onSubmit(data, reset as any))}
    >
      {FIELDS_USER_UPDATE.map((field) => (
        <div key={field} className='relative mb-2 grid gap-2'>
          <label className='text-text-primary dark:text-dark-text-primary'>
            {t(field)}
          </label>
          {field === 'countryId' ? (
            <SelectDropdown
              items={countries}
              fieldName='countryId'
              register={register}
              lng={lng}
              placeholder={t('select_country')}
              selectedValue={initialData?.country?.id}
            />
          ) : field === 'provinceId' ? (
            <SelectDropdown
              items={provinces}
              fieldName='provinceId'
              register={register}
              lng={lng}
              placeholder={t('select_province')}
              selectedValue={initialData?.province?.id}
            />
          ) : field === 'cantonId' ? (
            <SelectDropdown
              items={cantons}
              fieldName='cantonId'
              register={register}
              lng={lng}
              placeholder={t('select_canton')}
              selectedValue={initialData?.canton?.id}
            />
          ) : field === 'parishId' ? (
            <SelectDropdown
              items={parishes}
              fieldName='parishId'
              register={register}
              lng={lng}
              placeholder={t('select_parish')}
              selectedValue={initialData?.parish?.id}
            />
          ) : field === 'status' ? (
            <SelectDropdown
              items={statusOptions}
              fieldName='status'
              register={register}
              lng={lng}
              placeholder={t('select_status')}
              selectedValue={initialData?.status}
            />
          ) : field === 'role' ? (
            <SelectDropdown
              items={roleOptions}
              fieldName='role'
              register={register}
              lng={lng}
              placeholder={t('select_role')}
              selectedValue={initialData?.role}
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
