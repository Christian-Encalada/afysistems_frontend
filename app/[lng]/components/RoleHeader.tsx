import { cn } from '@/utils/utils';
import { t } from 'i18next';
import { DataTableRoleHeaderProps } from '@/types/table';

export default function DataTableRoleHeader({
  role,
  className,
}: DataTableRoleHeaderProps) {
  return (
    <span className={cn(className)}>
      {role === 'super admin'
        ? t('users:roles_super_admin')
        : role === 'admin'
          ? t('users:roles_admin')
          : t('users:roles_assistant')}
    </span>
  );
}
