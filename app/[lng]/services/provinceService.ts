import { get } from './requestHandler';

export const getALlProvinces = async (countryId = 1): Promise<any> => {
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
      countryId: String(countryId),
      lang: lang,
    }).toString();

    const response = await get(`/province?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
