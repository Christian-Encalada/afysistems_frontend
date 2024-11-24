'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTemplate } from '@/[lng]/services/templateSiteService';
import { getTenantId } from '@/utils/getTenantId';
import {
  ColorsTemplateType,
  Template,
  TemplateColorContextType,
} from '@/types/sites';
import { identifyTemplate } from '@/utils/SiteTemplates/identifyTemplate';
import {
  colorsPurpleWhite,
  colorsBlueWhite,
} from '@/utils/SiteTemplates/colorsTemplate';
import { ContentWithLoader } from '@/[lng]/components/TemplateLoader/ContentWithLoader';

const TemplateColorContext = createContext<
  TemplateColorContextType | undefined
>(undefined);

export const TemplateColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const changeColors = (templateColors: ColorsTemplateType) => {
    Object.entries(templateColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  };

  useEffect(() => {
    const applyTemplate = (templateType: Template) => {
      setTemplate(templateType);
      if (templateType === Template.PURPLE_WHITE) {
        changeColors(colorsPurpleWhite);
      } else if (templateType === Template.BLUE_WHITE) {
        changeColors(colorsBlueWhite);
      }

      localStorage.setItem('templateType', templateType);
    };

    const fetchTemplateColors = async () => {
      const subdomain = getTenantId();

      try {
        const response = await getTemplate(subdomain, 'es');

        const templateType = identifyTemplate(response);

        if (templateType) {
          applyTemplate(templateType);
        } else {
          console.error('No matching template found');
        }
      } catch (error) {
        console.error('Error fetching template:', error);
        applyTemplate(Template.PURPLE_WHITE);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);

    const savedTemplateColor = localStorage.getItem('templateType');

    if (savedTemplateColor) {
      setTemplate(savedTemplateColor as Template);
      changeColors(
        savedTemplateColor === Template.BLUE_WHITE
          ? colorsBlueWhite
          : colorsPurpleWhite
      );
      setIsLoading(false);
    } else {
      fetchTemplateColors();
    }
  }, []);

  return (
    <TemplateColorContext.Provider value={{ template, isLoading }}>
      <ContentWithLoader>{children}</ContentWithLoader>
    </TemplateColorContext.Provider>
  );
};

export const useTemplateColors = (): TemplateColorContextType => {
  const context = useContext(TemplateColorContext);
  if (!context) {
    throw new Error(
      'useTemplateColors must be used within an TemplateColorProvider'
    );
  }
  return context;
};
