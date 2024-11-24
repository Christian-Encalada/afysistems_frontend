import { UserDatum } from '@/types/usersResponse';
import { ColumnDef } from '@tanstack/react-table';
import ColumnHeader from '../ColumnHeader';
import DelateUser from './DelateUser';
import UpdateUser from './UpdateUser';
import ResetPasswordUser from './ResetPasswordUser';
import DataTableStatusHeader from '@/[lng]/components/Site/Table/StatusHeader';
import DataTableRoleHeader from '@/[lng]/components/RoleHeader';

export const usersColumns = ({
  handleDelete,
  reloadData,
  lng,
}: {
  handleDelete: (id: number) => void;
  reloadData: () => void;
  lng: string;
}): ColumnDef<UserDatum>[] => [
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <ColumnHeader type='users' column={column} title='username' />
    ),
    sortingFn: 'alphanumeric',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <ColumnHeader type='users' column={column} title='email' />
    ),
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'document',
    header: ({ column }) => (
      <ColumnHeader type='users' column={column} title='document' />
    ),
    cell: ({ getValue }) => getValue(),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <ColumnHeader type='users' column={column} title='role' />
    ),
    cell: ({ row }) => {
      const role = row.original.role;
      return <DataTableRoleHeader role={role} />;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <ColumnHeader type='users' column={column} title='phone' />
    ),
    cell: ({ getValue }) => getValue(),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'direction',
    header: ({ column }) => (
      <ColumnHeader type='users' column={column} title='direction' />
    ),
    cell: ({ getValue }) => getValue(),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <ColumnHeader type='users' column={column} title='createdAt' />
    ),
    sortingFn: 'datetime',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
    {
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader type='users' column={column} title='status' />,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <DataTableStatusHeader status={status} className="px-3 py-1 w-20 text-center rounded-full text-xs font-semibold" />
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <ColumnHeader type='users' column={column} title='actions' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center justify-center gap-x-2'>
        <UpdateUser userData={row.original} reloadData={reloadData} lng={lng} />
        <DelateUser onDelete={() => handleDelete(row.original.id)} />
        <ResetPasswordUser
          userId={row.original.id}
          reloadData={reloadData}
          lng={lng}
        />
      </div>
    ),
    enableSorting: false,
  },
];
