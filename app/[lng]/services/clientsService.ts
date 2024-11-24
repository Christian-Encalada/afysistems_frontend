import { ClientsResponse } from '@/types/clientsResponse';
import { get, patch, post } from './requestHandler';

export const getClients = async (
  page = 1,
  limit = 25,
  filters: {
    name?: string;
    lastName?: string;
    email?: string;
    document?: string;
    cantonName?: string;
    createdAt?: string;
  } = {}
): Promise<ClientsResponse> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
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
    const response = await get(`/clients?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as ClientsResponse;
  } catch (error) {
    throw error;
  }
};

export const createClient = async (data: any) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const lang = localStorage.getItem('i18nextLng');

    if (!lang) {
      throw new Error('Language not found');
    }

    const response = await post(`/clients?lang=${lang}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteClient = async (id: number) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const lang = localStorage.getItem('i18nextLng');

    if (!lang) {
      throw new Error('Language not found');
    }

    const response = await patch(
      `/clients/${id}/delete?lang=${lang}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateClient = async (id: number, data: any) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const lang = localStorage.getItem('i18nextLng');

    if (!lang) {
      throw new Error('Language not found');
    }

    const response = await patch(`/clients/${id}?lang=${lang}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
