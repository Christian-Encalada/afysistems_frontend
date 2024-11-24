'use client';

import React from 'react';
import { SiteTable } from '@/[lng]/components/Site/Table/SiteTable';
import { SiteListSkeleton } from '@/[lng]/components/Site/SiteListSkeleton';
import { useAuth } from '@/[lng]/contexts/AuthContext';

const SitesManageList: React.FC<{ lng: string }> = ({ lng }) => {
  const { isLoading } = useAuth();
  const type: string = 'manage';

  return (
    <div className='overflow-x-auto p-2'>
      {isLoading ? (
        <SiteListSkeleton rows={7} columns={5} lng={lng} type={type} />
      ) : (
        <SiteTable lng={lng} type={type} />
      )}
    </div>
  );
};

export default SitesManageList;
