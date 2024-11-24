import { Column, Table } from '@tanstack/react-table';
import { Template } from '@/types/sites';

export interface PaginationControlsProps<TData> {
  table: Table<TData>;
}

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  type: string;
  title: string;
}

export interface FilterInputProps {
  id: string;
  placeholder: string;
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface FilterDateInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DataTableStatusHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: boolean;
}

export interface DataTableColorHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}

export interface DataTableLogoHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logoName?: string | null;
}

export interface DataTableTemplateHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  template?: Template | null;
  lng: string;
}

export interface DataTableRoleHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  role: string;
}
