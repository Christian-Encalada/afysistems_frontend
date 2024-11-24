'use client';

import { MdEdit } from 'react-icons/md';
import SmallLoader from '@/[lng]/components/SmallLoader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/[lng]/components/ui/dialogClient';
import { useState } from 'react';
import { updateSite } from '@/[lng]/services/siteService';
import { toast } from 'react-toastify';
import SiteEditForm from '@/[lng]/components/Site/SiteEditForm';
import { useTranslation } from '@/i18n/client';
import { IFormUpdateSite } from '@/types/forms';

export default function UpdateSiteDialog({
  siteData,
  reloadData,
  lng,
}: {
  siteData: any;
  reloadData: () => void;
  lng: string;
}) {
  const { t } = useTranslation(lng, 'sites');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IFormUpdateSite, resetForm: any) => {
    setLoading(true);
    try {
      const response = await updateSite(siteData.id, data);

      if (!response) {
        throw new Error();
      }

      toast.success(t('site_updated'), { autoClose: 2000 });
      reloadData();
      resetForm();
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className='rounded-lg p-2 text-text-primary hover:bg-bg-primary-opacity dark:text-text-secondary hover:dark:bg-dark-secondary'>
            <MdEdit />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-text-primary dark:text-dark-text-primary'>
              {t('update_site')}
            </DialogTitle>
            <DialogDescription>
              {t('update_site_description')}
            </DialogDescription>
          </DialogHeader>
          <SiteEditForm
            defaultValues={siteData}
            onSubmit={onSubmit}
            lng={lng}
          />
          <DialogFooter>
            <button
              disabled={loading}
              form='form'
              type='submit'
              className='dark:text-dark-text-white rounded-xl bg-bg-primary px-5 py-3 text-sm text-text-secondary hover:bg-opacity-95 dark:bg-[#101019] hover:dark:bg-opacity-40'
            >
              {loading ? <SmallLoader /> : t('update')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
