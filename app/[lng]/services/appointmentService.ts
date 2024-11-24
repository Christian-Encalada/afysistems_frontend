import { AppointmentResponse } from '@/types/appointment/createAppointmentResponse';
import { CreateAppointmentDto } from '@/types/appointment/createAppointmentData';
import { get, post } from './requestHandler';

export const createAppointment = async (data: CreateAppointmentDto) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token not found');
  }

  const lang = localStorage.getItem('i18nextLng');

  if (!lang) {
    throw new Error('Language not found');
  }

  const response = await post(`/appointment?lang=${lang}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllAppointments = async (
  startRange: string,
  endRange: string
): Promise<any> => {
  const token = localStorage.getItem('token');
  const lang = localStorage.getItem('i18nextLng');

  if (!token || !lang) {
    throw new Error('Token or language not found');
  }

  const response = await get(
    `/appointment?lang=${lang}&startRange=${startRange}&endRange=${endRange}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
