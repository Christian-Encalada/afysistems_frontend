'use client';

import { HiStatusOnline } from 'react-icons/hi';
import { HiStatusOffline } from 'react-icons/hi';
import SmallLoader from '@/[lng]/components/SmallLoader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/[lng]/components/ui/dialogClient';
import { useState } from 'react';
import { changeStateSite } from '@/[lng]/services/siteService';
import { toast } from 'react-toastify';
import { useTranslation } from '@/i18n/client';

export default function UpdateStatusSite({
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
  const [isActivate, setIsActivate] = useState(siteData.status);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await changeStateSite(siteData.id, data);
      if (response) {
        toast.success(t('site_updated'), { autoClose: 2000 });
        reloadData();
      }
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async () => {
    const data = { status: isActivate ? false : true };
    await onSubmit(data);
    setIsActivate(!isActivate);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {!isActivate ? (
            <button className='rounded-lg p-2 text-text-primary hover:bg-bg-primary-opacity dark:text-text-secondary hover:dark:bg-dark-secondary'>
              <HiStatusOnline />
            </button>
          ) : (
            <button className='rounded-lg p-2 text-text-primary hover:bg-bg-primary-opacity dark:text-text-secondary hover:dark:bg-dark-secondary'>
              <HiStatusOffline />
            </button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {isActivate ? (
              <DialogTitle className='text-text-primary dark:text-dark-text-primary'>
                {t('desactivate_site')}
              </DialogTitle>
            ) : (
              <DialogTitle className='text-text-primary dark:text-dark-text-primary'>
                {t('activate_site')}
              </DialogTitle>
            )}
            <DialogDescription>
              {t('change_status_description')}
            </DialogDescription>
          </DialogHeader>
          <div className='grid w-full place-items-center'>
            <button
              disabled={loading}
              onClick={handleButtonClick}
              className='dark:text-dark-text-white rounded-xl bg-bg-primary px-5 py-3 text-sm text-text-secondary hover:bg-opacity-95 dark:bg-[#101019] hover:dark:bg-opacity-40'
            >
              {loading ? (
                <SmallLoader />
              ) : (
                t(isActivate ? 'desactivate' : 'activate')
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
