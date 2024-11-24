export const FIELDS = [
  'name',
  'lastName',
  'document',
  'email',
  'phone',
  'provinceId',
  'cantonId',
  'direction',
] as const;

export const FIELDS_USER = [
  'username',
  'password',
  'email',
  'role',
  'status',
  'document',
  'phone',
  'direction',
  'countryId',
  'provinceId',
  'cantonId',
  'parishId',
] as const;

export const FIELDS_USER_UPDATE = [
  'username',
  'email',
  'role',
  'status',
  'document',
  'phone',
  'direction',
  'countryId',
  'provinceId',
  'cantonId',
  'parishId',
] as const;

export const SITE_FIELDS = [
  'name',
  'description',
  'template',
  'primaryColor',
  'secondaryColor',
  'logo',
] as const;

export const SITE_EDIT_FIELDS = [
  'description',
  'template',
  'primaryColor',
  'secondaryColor',
  'logo',
] as const;


export const FIELDS_TEMPLATE = [
  'name',
  'content',
  'action',
  'status',
  'activate',
] as const;

export const FIELDS_PROFILE_UPDATE = [
  'username',
  'email',
  'role',
  'status',
  'document',
  'phone',
  'direction',
  'countryId',
  'provinceId',
  'cantonId',
  'parishId',
] as const;
