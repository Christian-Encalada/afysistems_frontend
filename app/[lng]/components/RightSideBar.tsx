'use client';
import { useTranslation } from '@/i18n/client';
import { MenuItem } from '@/types/item';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMdArrowDropright } from 'react-icons/io';
import { CgChevronLeft } from 'react-icons/cg';
import { useEffect, useState } from 'react';

export default function RightSideBar({
  activeItem,
  lng,
  isOpen,
  onHide,
}: {
  activeItem: MenuItem;
  lng: string;
  isOpen: boolean;
  onHide: () => void;
}) {
  const { t } = useTranslation(lng, 'dashboardDirection');
  const path = usePathname();
  const actualPath = '/' + path.split('/').slice(2).join('/');
  const [displayNone, setDisplayNone] = useState(!isOpen);

  // See if the sidebar is open or closed to hidden it
  useEffect(() => {
    if (isOpen) {
      setDisplayNone(false);
    } else {
      const timer = setTimeout(() => setDisplayNone(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed left-20 h-full w-60 bg-white py-8 pl-4 pr-6 shadow-md transition-transform duration-300 ease-in-out dark:bg-dark-primary ${
        isOpen ? 'animate-slide-out-right' : 'animate-slide-in-right'
      } ${displayNone ? 'hidden' : ''}`}
    >
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center gap-2 text-sm font-normal text-text-primary opacity-45 dark:text-text-secondary dark:opacity-80'>
          {activeItem.icon}
          <span>{t(activeItem.label as any).toUpperCase()}</span>
        </div>
        <button
          onClick={onHide}
          className='p-1 text-text-primary hover:rounded-md hover:bg-slate-100 dark:text-text-secondary dark:hover:bg-dark-secondary'
        >
          <CgChevronLeft size={24} />
        </button>
      </div>
      <div className='mt-8 flex flex-col gap-2'>
        {activeItem.children.map((child) => (
          <Link
            key={child.id}
            href={child.url}
            className={`${
              actualPath === child.url
                ? 'ml-2 bg-bg-primary-opacity pl-2 font-bold text-bg-primary dark:bg-dark-secondary dark:text-dark-text-primary'
                : 'ml-5 text-text-primary dark:text-text-secondary dark:hover:text-dark-text-primary'
            } flex w-full items-center gap-1 rounded-xl py-3 text-sm hover:text-bg-primary`}
            onClick={onHide}
          >
            {actualPath === child.url && (
              <IoMdArrowDropright className='h-5 w-5 text-bg-primary dark:text-dark-text-primary' />
            )}
            {t(child.label as any)}
          </Link>
        ))}
      </div>
    </div>
  );
}
