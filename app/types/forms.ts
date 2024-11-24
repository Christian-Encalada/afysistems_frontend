import { Template } from '@/types/sites';

export interface IFormLogin {
  username: string;
  password: string;
}

export interface IFormResetPassword {
  password: string;
  confirmPassword: string;
}

export interface IFormRequestResetPassword {
  email: string;
}

export interface IFormCreateClient {
  name: string;
  lastName: string;
  email: string;
  document: string;
  phone: string;
  direction: string;
  provinceId: number;
  cantonId: number;
}

export interface IFormUpdateClient {
  id?: number;
  username?: string;
  email?: string;
  document?: string;
  phone?: string;
  direction?: string;
  countryId?: number;
}

export interface IFormCreateUser {
  username: string;
  email: string;
  password: string;
  role: string;
  document?: string;
  phone?: string;
  direction?: string;
  countryId: number;
  provinceId: number;
  cantonId: number;
  parishId: number;
  status: boolean;
}
export interface IFormUpdateUser {
  username: string;
  email: string;
  role: string;
  document?: string;
  phone?: string;
  direction?: string;
  countryId: number;
  provinceId: number;
  cantonId: number;
  parishId: number;
  status: boolean;
}

export interface IFormCreateSite {
  name: string;
  description?: string;
  primaryColor?: string;
  secondaryColor?: string;
  template?: Template;
  logo?: File | null;
}

export interface IFormUpdateSite {
  description?: string;
  primaryColor?: string;
  secondaryColor?: string;
  template?: Template;
  logo?: File | null;
}

export interface IFormCreateTemplate {
  name: string;
  content: string;
  action: number;
  templateEnvIds: number[];
  status: boolean;
  activate: boolean;
}

export interface IFormUpdateTemplate {
  name: string;
  content: string;
  action: number;
  templateEnvIds: number[];
  status: boolean;
  activate: boolean;
}

export interface IFormUpdateProfile {
  username: string;
  email: string;
  role: string;
  document?: string;
  phone?: string;
  direction?: string;
  countryId: number;
  provinceId: number;
  cantonId: number;
  parishId: number;
  status: boolean;
  countries?: { id: number; name: string }[];
  provinces?: { id: number; name: string }[];
  cantons?: { id: number; name: string }[];
  parishes?: { id: number; name: string }[];
}