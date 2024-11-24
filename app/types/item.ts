import { DirectionKeys } from './dashboardLayout';

export type UserRole = 'super admin' | 'admin' | 'assistant' | 'user';

export interface MenuItem {
  id: string;
  label: DirectionKeys;
  icon: JSX.Element;
  children: {
    id: string;
    label: DirectionKeys;
    url: string;
    roles: UserRole[];
  }[];
  roles: UserRole[];
}
