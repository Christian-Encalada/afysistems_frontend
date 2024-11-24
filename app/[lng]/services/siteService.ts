import { SiteResponse } from '@/types/sitesResponse';
import {
  get,
  patch,
  patchForm,
  postForm,
} from '@/[lng]/services/requestHandler';

export const getSites = async (
  page = 1,
  limit = 10,
  filters: {
    name?: string;
    createdAt?: string;
  } = {}
): Promise<SiteResponse> => {
  try {
    const access_token = localStorage.getItem('token');
    if (!access_token) {
      throw new Error('Token not found');
    }

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) {
      throw new Error('Language not found');
    }

    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      lang: lang,
      ...filters,
    }).toString();

    const response = await get(`/sites?${queryParams}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return response.data as SiteResponse;
  } catch (error) {
    throw error;
  }
};

export const createSite = async (data: any) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const lang = localStorage.getItem('i18nextLng');

    if (!lang) {
      throw new Error('Language not found');
    }

    const formData = new FormData();

    formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.primaryColor) formData.append('primaryColor', data.primaryColor);
    if (data.secondaryColor)
      formData.append('secondaryColor', data.secondaryColor);
    if (data.template) formData.append('template', data.template);
    if (data.logo) formData.append('logo', data.logo);

    const response = await postForm(`/sites?lang=${lang}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSite = async (id: number, data: any) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const lang = localStorage.getItem('i18nextLng');

    if (!lang) {
      throw new Error('Language not found');
    }

    const formData = new FormData();

    if (data.description) formData.append('description', data.description);
    if (data.primaryColor) formData.append('primaryColor', data.primaryColor);
    if (data.secondaryColor)
      formData.append('secondaryColor', data.secondaryColor);
    if (data.template) formData.append('template', data.template);
    if (data.logo) formData.append('logo', data.logo);

    const response = await patchForm(`/sites/${id}?lang=${lang}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeStateSite = async (id: number, status: any) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const lang = localStorage.getItem('i18nextLng');

    if (!lang) {
      throw new Error('Language not found');
    }

    const response = await patch(`/sites/status/${id}?lang=${lang}`, status, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
