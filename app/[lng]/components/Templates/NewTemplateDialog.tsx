import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/[lng]/components/ui/dialogClient';
import { MdAddCircle } from 'react-icons/md';
import { useTranslation } from '@/i18n/client';
import { toast } from 'react-toastify';
import { IFormCreateTemplate } from '@/types/forms';
import { createTemplate, getTemplates, getTemplatesById } from '@/[lng]/services/templateService';
import TemplateForm from './TemplateForm';
import SmallLoader from '../SmallLoader';
import { TemplateDatum } from '@/types/templatesResponse';

export default function NewTemplateDialog({
  lng,
  reloadData,
}: {
  lng: string;
  reloadData: () => void;
}) {
  const { t } = useTranslation(lng, 'templates');
  const [loading, setLoading] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [selectedTemplateData, setSelectedTemplateData] = useState<IFormCreateTemplate | null>(null);
  const [availableTemplates, setAvailableTemplates] = useState<TemplateDatum[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogClose = () => {
    setSelectedTemplateId(null);
    setSelectedTemplateData(null);
    setIsOpen(false);
  };

  const onSubmit = async (data: IFormCreateTemplate, reset: () => void) => {
    setLoading(true);
    try {
      const response = await createTemplate({
        ...data,
        templateEnvIds: data.templateEnvIds ?? [],
      });

      if (response) {
        toast.success(t('template_created'), { autoClose: 2000 });
        reloadData();
        reset();
        handleDialogClose();
      }
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = async (templateId: number | null) => {
    if (!templateId) {
      setSelectedTemplateData(null);
      setSelectedTemplateId(null);
      return;
    }
  
    try {
      const templateData = await getTemplatesById(templateId);
      const action = templateData.action;
  
      const formattedTemplate: IFormCreateTemplate = {
        name: templateData.name,
        content: templateData.content,
        action: action?.id,
        templateEnvIds: templateData.envIds ?? [],
        status: templateData.status,
        activate: templateData.activate,
      };
      setSelectedTemplateData(formattedTemplate);
      setSelectedTemplateId(templateId);
    } catch (error) {
      toast.error(`Error fetching template: ${(error as Error).message}`);
    }
  };
  

  useEffect(() => {
    const fetchAvailableTemplates = async () => {
      try {
        const templatesResponse = await getTemplates();
        setAvailableTemplates(templatesResponse.TemplatesPaginated?.data || []);
      } catch (error) {
        toast.error(`Error loading templates: ${(error as Error).message}`);
      }
    };

    fetchAvailableTemplates();
  }, []);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) handleDialogClose();
      }}>
        <DialogTrigger asChild>
          <button className='dark:text-dark-text-white flex items-center justify-center gap-3 rounded-lg bg-bg-primary px-4 py-3 text-sm text-text-secondary dark:bg-dark-primary'>
            <MdAddCircle className='h-5 w-5' />
            {t('new_template')}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-text-primary dark:text-dark-text-primary'>
              {t('new_template')}
            </DialogTitle>
            <DialogDescription>{t('new_template_description')}</DialogDescription>
          </DialogHeader>
          <div className="mb-1 flex items-center">
          <label className="mr-3">{t('select_base_template')}</label>
          <select 
            className="rounded-lg bg-white border border-slate-400 px-3 py-3 text-sm text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-800 dark:placeholder-dark-text-secondary" 
            onChange={(e) => {
              const templateId = e.target.value ? Number(e.target.value) : null;
              handleSelectTemplate(templateId);
            }}
            value={selectedTemplateId || ''}
          >
            <option value="">{t('select_base_template')}</option>
            {availableTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
          <TemplateForm 
            onSubmit={onSubmit}
            lng={lng}
            defaultValues={selectedTemplateData || undefined} 
            isFormOpen={isOpen}
          />
          <DialogFooter>
            <button disabled={loading} form='form' type='submit' className='dark:text-dark-text-white rounded-xl bg-bg-primary px-5 py-3 text-sm text-text-secondary hover:bg-opacity-95 dark:bg-[#101019] hover:dark:bg-opacity-40'>
              {loading ? <SmallLoader /> : t('create')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
