"use client";

import React from 'react';
import Logo from '@public/Logo-noText.png';
import LogoWhite from '@public/Logo-white-noText.png';
import Image from 'next/image';
import BigLoader from '@/[lng]/components/BigLoader';

const Loader: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-white dark:bg-dark-secondary'>
      <div>
        <Image
          src={Logo}
          alt='Logo planifia'
          className='block dark:hidden w-60 sm:w-72'
        />
        <Image
          src={LogoWhite}
          alt='Logo planifia'
          className='hidden dark:block w-60 sm:w-72'
        />
        <div className="mt-4 flex justify-center">
          <BigLoader />
        </div> 
      </div>
    </div>
  );
};

export default Loader;
