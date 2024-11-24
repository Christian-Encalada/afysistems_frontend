import { get } from './requestHandler';

export const getAllCountries = async (): Promise<any> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await get('/country', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
