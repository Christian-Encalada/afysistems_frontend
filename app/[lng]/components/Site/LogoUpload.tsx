'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/i18n/client';
import { LuImagePlus } from 'react-icons/lu';

interface LogoUploadProps {
  onFileChange: (file: File | null) => void;
  lng: string;
  defaultImage?: string;
}

const LogoUpload: React.FC<LogoUploadProps> = ({
  onFileChange,
  lng,
  defaultImage = null,
}) => {
  const { t } = useTranslation(lng, 'sites');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(
    defaultImage ? defaultImage : null
  );

  const extractFileName = (url: string) => {
    return url.split('/').pop();
  };

  useEffect(() => {
    if (defaultImage) {
      const cleanFileName = extractFileName(defaultImage) || null;
      setFileName(cleanFileName);
    }
  }, [defaultImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFile(file);
      setFileName(file.name);
      onFileChange(file);
    } else {
      setFileName(null);
      onFileChange(null);
    }
  };

  return (
    <div className='relative mb-2 grid gap-2'>
      <input
        type='file'
        accept='.jpeg,.png'
        ref={fileInputRef}
        onChange={handleFileChange}
        className='hidden' // Hide the actual input
      />
      <div
        className='h-full cursor-pointer rounded-lg border border-slate-400 bg-white px-3 py-3 text-sm text-text-primary dark:border-slate-800 dark:bg-dark-secondary dark:text-dark-text-primary dark:placeholder-dark-text-secondary'
        onClick={() => fileInputRef.current?.click()}
      >
        {fileName ? (
          <div className='flex flex-col items-center gap-3'>
            {file ? (
              <Image
                src={URL.createObjectURL(file)}
                alt={fileName}
                width={250}
                height={250}
                className='mx-auto rounded-sm object-cover'
              />
            ) : (
              <Image
                src={defaultImage || ''}
                alt='Logo'
                width={250}
                height={250}
                className='mx-auto rounded-sm object-cover'
              />
            )}
            {fileName}
          </div>
        ) : (
          <div className='flex flex-col items-center gap-3'>
            <LuImagePlus size={20} />
            {t('ph_logo')}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoUpload;
