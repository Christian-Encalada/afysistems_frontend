import { get, patch } from './requestHandler';
import { IFormUpdateUser } from '@/types/forms';
import { UserDatum } from '@/types/usersResponse';

export const getProfile = async (): Promise<UserDatum> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');
    
    const lang = localStorage.getItem('i18nextLng') || 'en';
    const response = await get(`/users/profile?lang=${lang}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data: Partial<IFormUpdateUser>) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng') || 'en';
    const response = await patch(`/users/profile?lang=${lang}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
