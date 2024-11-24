'use client';

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
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IFormCreateSite } from '@/types/forms';
import SmallLoader from '@/[lng]/components/SmallLoader';
import SiteForm from '@/[lng]/components/Site/SiteForm';
import { createSite } from '@/[lng]/services/siteService';

export default function NewSiteDialog({
  lng,
  reloadData,
}: {
  lng: string;
  reloadData: () => void;
}) {
  const { t } = useTranslation(lng, 'sites');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: IFormCreateSite, resetForm: any) => {
    setLoading(true);
    try {
      const response = await createSite(data);
      if (response) {
        toast.success(t('site_created'), { autoClose: 2000 });
        reloadData();
        setIsOpen(false);
      }
      resetForm();
      resetForm();
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className='dark:text-dark-text-white flex items-center justify-center gap-3 rounded-lg bg-bg-primary px-4 py-3 text-sm text-text-secondary dark:bg-dark-primary'>
            <MdAddCircle className='h-5 w-5' />
            {t('new_site')}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-text-primary dark:text-dark-text-primary'>
              {t('new_site')}
            </DialogTitle>
            <DialogDescription>{t('message_create_site')}</DialogDescription>
          </DialogHeader>
          <SiteForm
            onSubmit={(data, reset) => onSubmit(data, reset)}
            lng={lng}
          />
          <DialogFooter>
            <button
              disabled={loading}
              form='form'
              type='submit'
              className='dark:text-dark-text-white rounded-xl bg-bg-primary px-5 py-3 text-sm text-text-secondary hover:bg-opacity-95 dark:bg-[#101019] hover:dark:bg-opacity-40'
            >
              {loading ? <SmallLoader /> : t('create')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
