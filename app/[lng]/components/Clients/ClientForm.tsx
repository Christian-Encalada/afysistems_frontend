'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { IFormCreateClient } from '@/types/forms';
import { useTranslation } from '@/i18n/client';
import { FIELDS } from '@/utils/constants';
import { getALlProvinces } from '../../services/provinceService';
import { getAllCantonsByProvince } from '../../services/cantonService';
import SelectDropdown from '../SelectDropdown';

export default function ClientForm({
  onSubmit,
  initialData,
  lng,
}: {
  onSubmit: SubmitHandler<any>;
  initialData?: any;
  lng: string;
}) {
  const { t } = useTranslation(lng, 'clients');
  const [provinces, setProvinces] = useState([]);
  const [cantons, setCantons] = useState([]);
  const schema = yup.object().shape({
    name: yup.string().required(t('error_name')),
    lastName: yup.string().required(t('error_last_name')),
    email: yup.string().email(t('invalid_email')).required(t('error_email')),
    document: yup.string().required(t('error_document')),
    phone: yup.string().required(t('error_phone')),
    direction: yup.string().required(t('error_direction')),
    provinceId: yup.number().required(t('error_province')),
    cantonId: yup.number().required(t('error_canton')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormCreateClient>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  const selectedProvince = watch('provinceId', initialData?.province?.id);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getALlProvinces();
        setProvinces(response);
      } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchCantons = async () => {
        try {
          const response = await getAllCantonsByProvince(selectedProvince);
          setCantons(response);
        } catch (error: any) {
          throw new Error(error.response?.data?.message || error.message);
        }
      };
      fetchCantons();
    }
  }, [selectedProvince, initialData]);

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        provinceId: initialData.province?.id,
        cantonId: initialData.canton?.id,
      });
    }
  }, [initialData, reset]);

  return (
    <form
      id='form'
      className='grid grid-cols-2 gap-x-6 gap-y-4 py-4'
      onSubmit={handleSubmit((data) => onSubmit(data, reset as any))}
    >
      {FIELDS.map((field) => (
        <div key={field} className='relative mb-2 grid gap-2'>
          <label className='text-text-primary dark:text-dark-text-primary'>
            {t(field)}
          </label>
          {field === 'provinceId' ? (
            <SelectDropdown
              items={provinces}
              fieldName='provinceId'
              register={register}
              lng={lng}
              placeholder={t('select_province')}
              selectedValue={initialData?.province.id}
            />
          ) : field === 'cantonId' ? (
            <SelectDropdown
              items={cantons}
              fieldName='cantonId'
              register={register}
              lng={lng}
              placeholder={t('select_canton')}
              selectedValue={initialData?.canton.id}
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
              onKeyDown={(e) => {
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
