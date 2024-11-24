'use client';

import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import SideBar from './SideBar';
import { DivProps } from '@/types/drawers';

export default function DrawerSideBar({
  lng,
  className = '',
  ...props
}: DivProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className={className} {...props}>
      <button
        onClick={() => setIsOpen(true)}
        className='rounded-lg bg-bg-primary-opacity p-2 dark:bg-dark-secondary'
      >
        <MdMenu
          size={30}
          className='text-text-primary dark:text-text-secondary'
        />
      </button>
      <div
        className={`${isOpen ? 'fixed' : 'hidden'} left-0 right-0 top-0 min-h-screen w-full bg-gray-600/50`}
        onClick={handleClose}
      ></div>
      <div
        className={`w-90 fixed left-0 top-0 h-full transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SideBar lng={lng} className='min-h-screen' />
      </div>
    </div>
  );
}
