import { get, patch, post, del } from './requestHandler';

// Obtener todas las variables de entorno
export const getAllTemplateEnvs = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const response = await get(`/templates/env?lang=${lang}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear una nueva variable de entorno
export const createTemplateEnv = async (data: any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const response = await post(`/templates/env?lang=${lang}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar una variable de entorno
export const deleteTemplateEnv = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const response = await del(`/templates/env/${id}?lang=${lang}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar una variable de entorno
export const updateTemplateEnv = async (id: number, data: any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const response = await patch(`/templates/env/${id}?lang=${lang}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};