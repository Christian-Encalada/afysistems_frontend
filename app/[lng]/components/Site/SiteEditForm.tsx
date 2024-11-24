'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { IFormUpdateSite } from '@/types/forms';
import { useTranslation } from '@/i18n/client';
import { SITE_EDIT_FIELDS } from '@/utils/constants';
import LogoUpload from '@/[lng]/components/Site/LogoUpload';
import ColorPickerDialog from '@/[lng]/components/ColorPickerDialog';
import SelectDropdown from '@/[lng]/components/SelectDropdown';
import { Template } from '@/types/sites';

export default function SiteEditForm({
  onSubmit,
  lng,
  defaultValues,
}: {
  onSubmit: SubmitHandler<IFormUpdateSite>;
  lng: string;
  defaultValues?: Partial<any>;
}) {
  const { t } = useTranslation(lng, 'sites');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState<string | undefined>(
    defaultValues?.primaryColor || undefined
  );
  const [secondaryColor, setSecondaryColor] = useState<string | undefined>(
    defaultValues?.secondaryColor || undefined
  );

  const schema = yup.object().shape({
    name: yup
      .string()
      .required(t('error_name'))
      .matches(/^[a-zA-Z0-9-_]+$/, t('error_name_spaces')),
    description: yup.string().nullable().optional(),
    primaryColor: yup.string().nullable().optional(),
    secondaryColor: yup.string().nullable().optional(),
  });

  const templateOptions = [
    { id: Template.PURPLE_WHITE, name: t('purple_white') },
    { id: Template.BLUE_WHITE, name: t('blue_white') },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormUpdateSite>({
    resolver: yupResolver(schema) as any,
    defaultValues,
  });

  const handleLogoChange = (file: File | null) => {
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setLogoError(t('error_invalid_file_type'));
      } else if (file.size > 2 * 1024 * 1024) {
        // Limit to 2MB
        setLogoError(t('error_file_too_large'));
      } else {
        setLogoFile(file);
        setLogoError(null);
      }
    } else {
      setLogoFile(null);
      setLogoError(null);
    }
  };

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmitForm: SubmitHandler<IFormUpdateSite> = async (data) => {
    if (logoError) return;

    if (logoFile) {
      const reader = new FileReader();
      reader.readAsDataURL(logoFile);
      reader.onloadend = () => {
        onSubmit(
          {
            ...data,
            logo: logoFile,
            primaryColor,
            secondaryColor,
          },
          reset as any
        );
      };
    } else {
      onSubmit(
        {
          ...data,
          logo: logoFile,
          primaryColor,
          secondaryColor,
        },
        reset as any
      );
    }
  };

  return (
    <form
      id='form'
      className='grid gap-y-3 overflow-y-scroll py-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4'
      onSubmit={handleSubmit(onSubmitForm)}
    >
      {SITE_EDIT_FIELDS.map((field) => (
        <div
          key={field}
          className={`relative mb-2 grid gap-2 ${field === 'logo' ? 'sm:col-span-2' : ''}`}
        >
          <label className='text-text-primary dark:text-dark-text-primary'>
            {t(field)}
          </label>
          {field === 'logo' ? (
            <div>
              <LogoUpload
                onFileChange={handleLogoChange}
                defaultImage={defaultValues?.logo}
                lng={lng}
              />
              {logoError && (
                <p className='col-span-2 text-xs font-medium text-red-500 dark:text-red-500'>
                  {logoError}
                </p>
              )}
            </div>
          ) : field === 'template' ? (
            <SelectDropdown
              items={templateOptions}
              fieldName='template'
              register={register}
              lng={lng}
              placeholder={t('ph_template')}
              selectedValue={defaultValues?.template}
            />
          ) : field === 'primaryColor' ? (
            <div className='mt-2'>
              <ColorPickerDialog
                initialColor={primaryColor || '#ffff'}
                onColorChange={(color: any) => setPrimaryColor(color)}
                lng={lng}
              />
            </div>
          ) : field === 'secondaryColor' ? (
            <div className='mt-2'>
              <ColorPickerDialog
                initialColor={secondaryColor || '#ffff'}
                onColorChange={(color: any) => setSecondaryColor(color)}
                lng={lng}
              />
            </div>
          ) : (
            <input
              type='text'
              {...register(field)}
              className='rounded-lg border border-slate-400 bg-white px-3 py-3 text-sm text-text-primary dark:border-slate-800 dark:bg-dark-secondary dark:text-dark-text-primary dark:placeholder-dark-text-secondary'
              placeholder={t(`ph_${field}`)}
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
