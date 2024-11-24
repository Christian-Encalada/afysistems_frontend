import { Template } from '@/types/sites';

export interface SiteResponse {
  SitePaginated: SitePaginated;
  totalCount: number;
}

export interface SitePaginated {
  data: SiteDatum[];
  totalCount: number;
  sitePerPage: number;
  totalPages: number;
}

export interface SiteDatum {
  id: number;
  name: string;
  description?: string | null;
  primaryColor?: string;
  secondaryColor?: string;
  template?: Template;
  logo?: string | null;
  status: boolean;
}
