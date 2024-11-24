"use client";

import React from 'react';
import { useTemplateColors } from '@/[lng]/contexts/TemplateColorContext';
import Loader from '@/[lng]/components//TemplateLoader/Loader';

export const ContentWithLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useTemplateColors();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {children}
    </>
  );
};
