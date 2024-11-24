import { get, patch, post, del } from './requestHandler';

// Obtener todas las acciones
export const getAllActions = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const response = await get(`/templates/action?lang=${lang}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear una nueva acción
export const createAction = async (data: any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const response = await post(`/templates/action?lang=${lang}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar una acción
export const deleteAction = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const response = await del(`/templates/action/${id}?lang=${lang}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar una acción
export const updateAction = async (id: number, data: any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const response = await patch(`/templates/action/${id}?lang=${lang}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
