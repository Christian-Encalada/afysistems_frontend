'use client';

import { useTranslation } from '@/i18n/client';
import { Template } from '@/types/sites';
import { DataTableTemplateHeaderProps } from '@/types/table';

export default function DataTableTemplateHeader<TData, TValue>({
  template = null,
  lng,
}: DataTableTemplateHeaderProps) {
  const { t } = useTranslation(lng, 'sites');

  return (
    <>
      {template === Template.PURPLE_WHITE ? (
        <label>{t('purple_white')}</label>
      ) : template === Template.BLUE_WHITE ? (
        <label>{t('blue_white')}</label>
      ) : (
        <></>
      )}
    </>
  );
}
