export interface AppointmentResponse {
  title: string;
  description: string;
  startDate: Date;
  startTime: string;
  frequency: string;
  notificationMethod: string[];
  user: User;
  tenant: Tenant;
  client: Client;
  recurrenceRule: AppointmentResponseRecurrenceRule;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  recurringDates: Date[];
}

export interface Client {
  id: number;
  name: string;
  lastName: string;
  email: string;
  document: string;
  phone: string;
  direction: string;
  createdAt: Date;
  updateAt: Date;
  deleted: boolean;
}

export interface AppointmentResponseRecurrenceRule {
  interval: number;
  frequencyType: string;
  daysOfWeek: string[];
  endType: string;
  endDate: Date;
  appointment: Appointment;
  occurrences: null;
  id: number;
}

export interface Appointment {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  startTime: string;
  frequency: string;
  notificationMethod: string[];
  createdAt: Date;
  updatedAt: Date;
  user: User;
  tenant: Tenant;
  client: Client;
  recurrenceRule: AppointmentRecurrenceRule;
}

export interface AppointmentRecurrenceRule {
  interval: number;
  frequencyType: string;
  daysOfWeek: string[];
  endType: string;
  endDate: Date;
}

export interface Tenant {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: null;
  lastName: null;
  email: string;
  document: string;
  phone: string;
  direction: string;
  createdAt: Date;
  updateAt: Date;
  deleted: boolean;
  username: string;
  role: string;
  resetPasswordToken: null;
  status: boolean;
}
