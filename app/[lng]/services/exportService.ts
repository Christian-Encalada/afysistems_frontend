import { post } from "@/[lng]/services/requestHandler";

export const exportReportPDF = async (data: any, type: string) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const lang = localStorage.getItem('i18nextLng');

    if (!lang) {
      throw new Error('Language not found');
    }

    const response = await post(`/export/pdf/${type}/?lang=${lang}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const exportReportExcel = async (data: any, type: string) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const lang = localStorage.getItem('i18nextLng');

    if (!lang) {
      throw new Error('Language not found');
    }

    const response = await post(`/export/excel/${type}/?lang=${lang}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
