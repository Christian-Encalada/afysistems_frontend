import { Datum } from '@/types/clientsResponse';
import { ColumnDef } from '@tanstack/react-table';
import ColumnHeader from '../ColumnHeader';
import DelateClient from './DelateClient';
import UpdateClient from './UpdateClient';

export const clientsColumns = ({
  reloadData,
  lng,
  type = 'manage',
}: {
  reloadData: () => void;
  lng: string;
  type?: string;
}): ColumnDef<Datum>[] => {
  const columns: ColumnDef<Datum>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <ColumnHeader type='clients' column={column} title='name' />
      ),
      sortingFn: 'alphanumeric',
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => (
        <ColumnHeader type='clients' column={column} title='lastName' />
      ),
      sortingFn: 'alphanumeric',
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <ColumnHeader type='clients' column={column} title='email' />
      ),
      cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
      enableSorting: false,
      enableHiding: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: 'canton.name',
      header: ({ column }) => (
        <ColumnHeader type='clients' column={column} title='cantonId' />
      ),
      cell: ({ getValue }) => getValue(),
      enableSorting: false,
    },
    {
      accessorKey: 'document',
      header: ({ column }) => (
        <ColumnHeader type='clients' column={column} title='document' />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => (
        <ColumnHeader type='clients' column={column} title='phone' />
      ),
      cell: ({ getValue }) => getValue(),
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: 'direction',
      header: ({ column }) => (
        <ColumnHeader type='clients' column={column} title='direction' />
      ),
      cell: ({ getValue }) => getValue(),
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <ColumnHeader type='clients' column={column} title='createdAt' />
      ),
      sortingFn: 'datetime',
      cell: ({ getValue }) =>
        new Date(getValue() as string).toLocaleDateString(),
    },
  ];

  if (type === 'manage') {
    columns.push({
      id: 'actions',
      header: ({ column }) => (
        <ColumnHeader type='clients' column={column} title='actions' />
      ),
      cell: ({ row }) => (
        <div className='flex items-center justify-center gap-x-2'>
          <UpdateClient
            clientData={row.original}
            reloadData={reloadData}
            lng={lng}
          />
          <DelateClient clientId={row.original.id} reloadData={reloadData} />
        </div>
      ),
      enableSorting: false,
    });
  }

  return columns;
};
