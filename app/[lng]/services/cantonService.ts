import { get } from './requestHandler';

export const getAllCantonsByProvince = async (
  provinceId: number
): Promise<any> => {
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
      provinceId: String(provinceId),
      lang: lang,
    }).toString();

    const response = await get(`/canton?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCantons = async (): Promise<any> => {
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
      lang: lang,
    }).toString();

    const response = await get(`/canton/all?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
