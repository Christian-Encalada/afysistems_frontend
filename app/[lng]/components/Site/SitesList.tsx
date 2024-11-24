'use client';

import { useTranslation } from '@/i18n/client';
import { SiteTable } from '@/[lng]/components/Site/Table/SiteTable';
import { SiteListSkeleton } from '@/[lng]/components/Site/SiteListSkeleton';
import { useAuth } from '@/[lng]/contexts/AuthContext';

const SitesList: React.FC<{ lng: string }> = ({ lng }) => {
  const { t } = useTranslation(lng, 'sites');
  const { isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <SiteListSkeleton rows={7} columns={5} lng={lng} />
      ) : (
        <div className='overflow-x-auto p-2'>
          <SiteTable lng={lng} type='list' />
        </div>
      )}
    </>
  );
};

export default SitesList;
