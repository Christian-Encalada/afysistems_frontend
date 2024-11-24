import { get, post, del, patch } from './requestHandler';
import { getTenantId } from '@/utils/getTenantId';

// Función auxiliar para obtener el token y el idioma
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }

  const lang = localStorage.getItem('i18nextLng');
  if (!lang) {
    throw new Error('Language not found');
  }

  return {
    Authorization: `Bearer ${token}`,
    'Accept-Language': lang,
  };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

// Función para generar la previsualización del formulario
export const generateFormPreview = async ({
  formId,
  title,
  description,
  questions,
  sections,
}: {
  formId: number;
  title: string;
  description: string;
  questions: Array<{ label: string; content: string; type: string; options?: string[] }>;
  sections: Array<{
    title: string;
    order: number;
    questions: Array<{ label: string; content: string; type: string; options?: string[] }>;
  }>;
}) => {
  try {
    const headers = {
      ...getAuthHeaders(),
      'x-tenant-id': getTenantId(),
    };

    const allQuestions = [
      ...questions,
      ...sections.flatMap((section) => section.questions),
    ];

    const response = await post(
      `${API_BASE_URL}/forms/${formId}/preview`,
      {
        title,
        description,
        questions: allQuestions,
      },
      { 
        headers,
        timeout: 30000, // Aumenta el timeout para dar tiempo a Puppeteer
      }
    );

    return response.data.previewImageUrl;
  } catch (error: any) {
    console.error('Error generando preview:', error);
    throw error;
  }
};

// Función para crear un formulario
export const createForm = async (data: {
  title: string;
  description: string;
  questions: Array<{ label: string; content: string; type: string; options?: string[]; required?: boolean }>;
  sections: Array<{
    title: string;
    order: number;
    questions: Array<{ label: string; content: string; type: string; options?: string[]; required?: boolean }>;
  }>;
}) => {
  try {
    const headers = getAuthHeaders();
    const response = await post(`${API_BASE_URL}/forms`, data, { headers });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error en el backend:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error al crear el formulario:', error.message);
    }
    throw error;
  }
};

// Función para obtener un formulario específico por su ID
export const getFormById = async (formId: number) => {
  try {
    const headers = getAuthHeaders();
    const response = await get(`${API_BASE_URL}/forms/${formId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el formulario:", error);
    throw error;
  }
};

// Función para obtener todos los formularios
export const getForms = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await get(`${API_BASE_URL}/forms`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los formularios:", error);
    throw error;
  }
};

// Función para actualizar el título del formulario
export const updateFormTitle = async (formId: number, newTitle: string) => {
  try {
    const headers = getAuthHeaders();
    const response = await patch(`${API_BASE_URL}/forms/${formId}/title`, { title: newTitle }, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el título del formulario:", error);
    throw error;
  }
};

// Función para eliminar un formulario
export const deleteForm = async (formId: number) => {
  try {
    const headers = getAuthHeaders();
    const response = await del(`${API_BASE_URL}/forms/${formId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el formulario:", error);
    throw error;
  }
};

// Función para actualizar un formulario completo
export const updateForm = async (formId: number, data: {
  title?: string;
  description?: string;
  questions?: Array<{ label: string; content: string; type: string; options?: string[]; required?: boolean }>;
  sections?: Array<{
    title: string;
    order: number;
    questions: Array<{ label: string; content: string; type: string; options?: string[]; required?: boolean }>;
  }>;
}) => {
  try {
    const headers = getAuthHeaders();
    const response = await patch(`${API_BASE_URL}/forms/${formId}`, data, { headers });
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar el formulario:", error);
    throw error;
  }
};
