import { Language } from '@/i18n/settings';
import { Namespace, KeyPrefix } from 'i18next';

export interface MetaParams {
  params: {
    lng: string;
  };
}

export interface MetadataParams {
  lng: Language;
  namespace?: string;
  keyPrefix?: KeyPrefix<Namespace> | undefined;
}

export interface PageProps {
  params: {
    lng: string;
  };
}

export interface DashboardProps {
  params: {
    lng: string;
  };
}
