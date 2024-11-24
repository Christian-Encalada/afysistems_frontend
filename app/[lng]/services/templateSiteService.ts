import { get } from './requestHandler';

export const getTemplate = async (
  name: string,
  lang: string
): Promise<any> => {
  try {
    const response = await get(`/sites/template?name=${name}&lang=${lang}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};