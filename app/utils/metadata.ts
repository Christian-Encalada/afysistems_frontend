/* eslint-disable react-hooks/rules-of-hooks */
import { languages, fallbackLng, Language } from '@/i18n/settings';
import { FlatNamespace } from 'i18next';
import { useTranslation } from '@/i18n';
import { MetadataParams } from '@/types/';
import LogoImage from '@public/Logo-white-noText.png';

export async function generatePageMetadata({
  lng,
  namespace = 'index',
  keyPrefix
}: MetadataParams) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng as Language;
  const { t } = await useTranslation(lng, namespace as FlatNamespace, { keyPrefix });

  return {
    title: t('title' as any),
    description: t('description' as any),
    keywords: t('keywords' as any),
    openGraph: {
      type: 'website',
      title: t('title' as any),
      description: t('description' as any),
      images: [{
        url: LogoImage.src,
        width: 800,
        height: 600,
      }],
    }
  };
}