import { UsersResponse } from '@/types/usersResponse';
import { del, get, patch, post } from './requestHandler';

export const getUsers = async (
  page = 1,
  limit = 25,
  filters: {
    username?: string;
    role?: string;
    status?: boolean | string; // Acepta booleano o string para mayor flexibilidad
    createdAt?: string;
  } = {}
): Promise<UsersResponse> => {
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
      ...Object.fromEntries(
        Object.entries(filters).map(([key, value]) => {
          if (key === 'status' && typeof value === 'boolean') {
            return [key, value ? 'true' : 'false'];
          }
          return [key, String(value)];
        })
      ),
    }).toString();

    const response = await get(`/users?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as UsersResponse;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: any) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const lang = localStorage.getItem('i18nextLng');

    if (!lang) {
      throw new Error('Language not found');
    }

    const response = await post(`/users?lang=${lang}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const lang = localStorage.getItem('i18nextLng');

    if (!lang) {
      throw new Error('Language not found');
    }

    const response = await del(`/users/${id}?lang=${lang}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: number, data: any) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const lang = localStorage.getItem('i18nextLng');

    if (!lang) {
      throw new Error('Language not found');
    }

    const response = await patch(`/users/${id}?lang=${lang}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetUserPassword = async (id: number, newPassword: string) => {
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
      `/users/${id}/reset_password?lang=${lang}`,
      { newPassword },
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
