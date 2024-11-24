'use client';
import { useState } from 'react';
import { MdArrowDownward } from 'react-icons/md';
import NavIcons from './NavIcons';
import { DivProps } from '@/types/drawers';

export default function DrawerIcons({
  className = '',
  lng,
  ...props
}: DivProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className} {...props}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='transition-transform duration-300 ease-in-out'
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        <MdArrowDownward size={30} />
      </button>
      <div
        className={`fixed left-0 top-0 flex w-full items-center bg-[#ebebf4] px-7 py-2 transition-all duration-300 ease-in-out dark:bg-dark-text-secondary md:px-9 ${
          isOpen ? 'translate-y-20 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <NavIcons lng={lng} />
      </div>
    </div>
  );
}
