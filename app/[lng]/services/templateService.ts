import { get, patch, post, del } from './requestHandler';
import { TemplatesResponse } from '@/types/templatesResponse';

// Obtener todas las plantillas paginadas con filtros
export const getTemplates = async (
  page = 1,
  limit = 25,
  filters: {
    name?: string;
    status?: boolean | string;
    createdAt?: string;
    activate?: boolean | string;
  } = {}
): Promise<TemplatesResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      lang: lang,
      ...Object.fromEntries(
        Object.entries(filters).map(([key, value]) => {
          if (key === 'status' || key === 'activate') {
            return [key, typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value)];
          }
          return [key, String(value)];
        })
      ),
    }).toString();

    const response = await get(`/templates?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data as TemplatesResponse;
  } catch (error) {
    throw error;
  }
};

// Obtener una plantilla por ID
export const getTemplatesById = async (id: number): Promise<TemplatesResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const response = await get(`/templates/id/${id}?lang=${lang}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data as TemplatesResponse;
  } catch (error) {
    throw error;
  }
};


// Crear una nueva plantilla
export const createTemplate = async (data: any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const response = await post(`/templates?lang=${lang}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar una plantilla
export const deleteTemplate = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const response = await del(`/templates/${id}?lang=${lang}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar una plantilla
export const updateTemplate = async (id: number, data: any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const lang = localStorage.getItem('i18nextLng');
    if (!lang) throw new Error('Language not found');

    const response = await patch(`/templates/${id}?lang=${lang}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
