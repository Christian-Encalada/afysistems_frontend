'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IFormUpdateTemplate } from '@/types/forms';
import { useTranslation } from '@/i18n/client';
import RichTextEditor from './RichTextEditor';
import SelectDropdown from '../TemplateSelectDropdown';
import { getAllActions } from '../../services/actionService';
import { FIELDS_TEMPLATE } from '@/utils/constants';
import SkeletonForm from '@/[lng]/components/SkeletonForm';

export default function UpdateTemplateForm({
  onSubmit,
  initialData,
  lng,
}: {
  onSubmit: SubmitHandler<any>;
  initialData?: any;
  lng: string;
}) {
  const { t } = useTranslation(lng, 'templates');

  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState([]);
  const [content, setContent] = useState<string>(initialData?.content || '');
  const [templateEnvIds, setTemplateEnvIds] = useState<number[]>(initialData?.templateEnvIds || []);
  const [selectedAction, setSelectedAction] = useState<number | undefined>(initialData?.action?.id);

  const statusOptions = [
    { id: true, name: t('active') },
    { id: false, name: t('inactive') },
  ];

  const activateOptions = [
    { id: true, name: t('activated') },
    { id: false, name: t('deactivated') },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormUpdateTemplate>({
    defaultValues: initialData,
  });

  const watchedAction = watch('action', initialData?.action?.id);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await getAllActions();
        setActions(response.TemplateActionsPaginated?.data || []);
      } catch (error) {
        console.error('Error fetching actions:', error);
      }
    };

    // Cargar las acciones y desactivar loading solo después de cargar todo
    const fetchData = async () => {
      setLoading(true);  // Mantenemos la carga activa hasta que tengamos todos los datos
      await fetchActions();  // Cargar las acciones disponibles

      // Si los datos iniciales están disponibles, inicializamos los valores del formulario
      if (initialData) {
        reset({
          ...initialData,
          action: initialData.action?.id,
        });
        setContent(initialData.content || '');
        setSelectedAction(initialData.action?.id);
        setTemplateEnvIds(initialData.templateEnvIds || []);
      }

      setLoading(false);  // Cargar completada
    };

    fetchData();  // Llamamos a la función de carga
  }, [initialData, reset]);

  if (loading) {
    return <SkeletonForm rows={FIELDS_TEMPLATE.length} />;  // Mostrar el skeleton mientras se carga
  }

  return (
    <form
      id="form"
      className="grid grid-cols-2 gap-6 p-6"
      onSubmit={handleSubmit((data) => {
        onSubmit({
          ...data,
          action: selectedAction || 0,
          content,
          templateEnvIds,
        });
      })}
    >
      {/* Primera fila: 'name' y 'action' */}
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {FIELDS_TEMPLATE.includes('name') && (
          <div>
            <label className="block mb-2">{t('name')}</label>
            <input
              type="text"
              {...register('name')}
              className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-sm dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-700"
            />
            {errors.name && <p className="text-xs text-red-500 mt-2">{errors.name?.message}</p>}
          </div>
        )}
        {FIELDS_TEMPLATE.includes('action') && (
          <div>
            <label className="block mb-2">{t('action')}</label>
            <SelectDropdown
              items={actions}
              fieldName="action"
              register={register}
              lng={lng}
              placeholder={t('select_action')}
              selectedValue={selectedAction ?? ''}
              onValueChange={(val: string | number) => setSelectedAction(Number(val))}
            />
            {errors.action && <p className="text-xs text-red-500 mt-2">{errors.action?.message}</p>}
          </div>
        )}
      </div>

      {/* Segunda fila: 'content' */}
      {FIELDS_TEMPLATE.includes('content') && (
        <div className="col-span-2">
          <label className="block mb-2">{t('content')}</label>
          <RichTextEditor value={content} onChange={setContent} lng={lng} />
          {errors.content && <p className="text-xs text-red-500 mt-2">{errors.content?.message}</p>}
        </div>
      )}

      {/* Tercera fila: 'status' y 'activate' */}
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {FIELDS_TEMPLATE.includes('status') && (
          <div>
            <label className="block mb-2">{t('status')}</label>
            <SelectDropdown
              items={statusOptions}
              fieldName='status'
              register={register}
              lng={lng}
              placeholder={t('select_status')}
              selectedValue={initialData?.status}
            />
            {errors.status && <p className="text-xs text-red-500 mt-2">{errors.status?.message}</p>}
          </div>
        )}
        {FIELDS_TEMPLATE.includes('activate') && (
          <div>
            <label className="block mb-2">{t('activate')}</label>
            <SelectDropdown
              items={activateOptions}
              fieldName="activate"
              register={register}
              lng={lng}
              placeholder={t('select_activate')}
              selectedValue={initialData?.activate}
            />
            {errors.activate && <p className="text-xs text-red-500 mt-2">{errors.activate?.message}</p>}
          </div>
        )}
      </div>
    </form>
  );
}
