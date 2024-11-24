import { post, patch } from './requestHandler';
import { LoginData } from '../../types/users';
import { IFormRequestResetPassword } from '@/types/forms';

export const login = async (data: LoginData, lang: string): Promise<any> => {
  try {
    const response = await post(`/auth/login?lang=${lang}`, data);
    const { access_token, user } = response.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    document.cookie = `token=${access_token}`;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  // Removed the token and user keys
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Removed the templateType key
  localStorage.removeItem('templateType');
  document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const requestResetPassword = async (
  data: IFormRequestResetPassword,
  lang: string
): Promise<any> => {
  try {
    const response = await patch(
      `/auth/request-reset-password?lang=${lang}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (
  resetPasswordToken: string | string[],
  password: string,
  lang: string
): Promise<any> => {
  try {
    const response = await patch(`/auth/reset-password?lang=${lang}`, {
      resetPasswordToken,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No se encontró el token');

  await patch(
    '/auth/change-password',
    { currentPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
