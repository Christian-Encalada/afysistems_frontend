'use client';

import { useTranslation } from '@/i18n/client';
import React from 'react';

interface SiteListSkeletonTypes<TData, TValue> {
  rows: number;
  columns: number;
  lng: string;
  type?: string;
}

export function SiteListSkeleton<TData, TValue>({
  rows,
  columns,
  lng,
  type = 'list',
}: SiteListSkeletonTypes<TData, TValue>) {
  const { t } = useTranslation(lng, 'sites');

  return (
    <div className='animate-pulse p-2'>
      <div className='items-center py-4 sm:flex sm:flex-row'>
        {type === 'manage' ? (
          <h1 className='text-xl'>{t('layout_title_manage')}</h1>
        ) : (
          <h1 className='text-xl'>{t('layout_title_list')}</h1>
        )}
        <div className='mb-2 max-w-xs sm:mb-0'></div>
        <div className='my-4 ml-1 sm:my-0 sm:ml-auto'>
          <div className='h-10 w-40 rounded bg-gray-300 dark:bg-gray-600'></div>
        </div>
      </div>
      <div className='overflow-x-auto rounded-lg'>
        <table className='min-w-full rounded-lg bg-gray-100 text-text-primary dark:bg-dark-primary dark:text-text-secondary'>
          <thead className='bg-bg-primary-opacity dark:bg-dark-primary'>
            <tr>
              {[...Array(columns)].map((_, index) => (
                <th
                  key={index}
                  className='px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider'
                >
                  <div className='h-4 w-24 rounded bg-gray-300 dark:bg-gray-600'></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='rounded-lg bg-white dark:bg-gray-700'>
            {[...Array(rows)].map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className='border-b border-gray-200 dark:border-gray-600'
              >
                {[...Array(columns)].map((_, colIndex) => (
                  <td key={colIndex} className='whitespace-nowrap px-6 py-4'>
                    <div className='h-4 w-full rounded bg-gray-300 dark:bg-gray-600'></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
