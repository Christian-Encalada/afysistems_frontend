import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getAllActions } from '../../services/actionService';
import RichTextEditor from './RichTextEditor';
import { IFormCreateTemplate } from '@/types/forms';
import { useTranslation } from '@/i18n/client';
import SelectDropdown from '../TemplateSelectDropdown';
import { FIELDS_TEMPLATE } from '@/utils/constants';

export default function TemplateForm({
  onSubmit,
  defaultValues,
  lng,
  isFormOpen,
}: {
  onSubmit: (data: IFormCreateTemplate, resetForm: () => void) => void;
  defaultValues?: Partial<IFormCreateTemplate>;
  lng: string;
  isFormOpen: boolean;
}) {
  const { t } = useTranslation(lng, 'templates');
  const [actions, setActions] = useState<{ id: number; name: string }[]>([]);
  const [selectedAction, setSelectedAction] = useState<number | undefined>(defaultValues?.action || undefined);
  const [content, setContent] = useState<string>(defaultValues?.content || '');
  const [selectedStatus, setSelectedStatus] = useState<boolean>(defaultValues?.status ?? true);
  const [selectedActivate, setSelectedActivate] = useState<boolean>(defaultValues?.activate ?? true);

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
  } = useForm<IFormCreateTemplate>({
    defaultValues,
  });

  const watchedAction = watch('action', selectedAction);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await getAllActions();
        setActions(response.TemplateActionsPaginated?.data || []);
      } catch (error) {
        console.error('Error fetching actions:', error);
      }
    };
    fetchActions();
  }, []);

  useEffect(() => {
    if (!isFormOpen) {
      reset({
        name: '',
        content: '',
        action: undefined,
        status: true,
        activate: true,
      });
      setContent('');
      setSelectedAction(undefined);
      setSelectedStatus(true);
      setSelectedActivate(true);
    }
  }, [isFormOpen, reset]);  

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        action: defaultValues.action || undefined,
      });
      setContent(defaultValues.content || '');
      setSelectedAction(defaultValues.action || undefined);
      setSelectedStatus(defaultValues.status ?? true);
      setSelectedActivate(defaultValues.activate ?? true);
    }
  }, [defaultValues, reset]);

  const onSubmitForm = handleSubmit((data) => {
    onSubmit(
      {
        ...data,
        action: selectedAction !== undefined ? Number(selectedAction) : 0,
        content,
        status: selectedStatus,
        activate: selectedActivate,
      },
      reset
    );
    window.location.reload();
  });

  return (
    <form id="form" className="grid grid-cols-2 gap-6 p-6" onSubmit={onSubmitForm}>
      {/* Campos del formulario */}
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {FIELDS_TEMPLATE.includes('name') && (
          <div>
            <label className="block mb-2">{t('name')}</label>
            <input
              type="text"
              {...register('name')}
              className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-sm dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-700"
            />
            {errors.name && <p className="text-xs text-red-500 mt-2">{errors.name.message}</p>}
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
            {errors.action && <p className="text-xs text-red-500 mt-2">{errors.action.message}</p>}
          </div>
        )}
      </div>
      {FIELDS_TEMPLATE.includes('content') && (
        <div className="col-span-2">
          <label className="block mb-2">{t('content')}</label>
          <RichTextEditor value={content} onChange={setContent} lng={lng} />
          {errors.content && <p className="text-xs text-red-500 mt-2">{errors.content.message}</p>}
        </div>
      )}
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {FIELDS_TEMPLATE.includes('status') && (
          <div>
            <label className="block mb-2">{t('status')}</label>
            <SelectDropdown
              items={statusOptions}
              fieldName="status"
              register={register}
              lng={lng}
              placeholder={t('select_status')}
              selectedValue={selectedStatus}
              onValueChange={(val: string | number) => setSelectedStatus(val === 'true')}
            />
            {errors.status && <p className="text-xs text-red-500 mt-2">{errors.status.message}</p>}
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
              selectedValue={selectedActivate}
              onValueChange={(val: string | number) => setSelectedActivate(val === 'true')}
            />
            {errors.activate && <p className="text-xs text-red-500 mt-2">{errors.activate.message}</p>}
          </div>
        )}
      </div>
    </form>
  );
}
