import { Site } from '@/types/sites';
import { ColumnDef } from '@tanstack/react-table';
import ColumnHeader from '@/[lng]/components/ColumnHeader';
import DataTableStatusHeader from '@/[lng]/components/Site/Table/StatusHeader';

export const siteColumns: ColumnDef<Site>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader type='sites' column={column} title='name' />
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <ColumnHeader type='sites' column={column} title='description' />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader type='sites' column={column} title='status' />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return <DataTableStatusHeader status={status} />;
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <ColumnHeader type='sites' column={column} title='createdAt' />
    ),
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
    sortingFn: 'datetime',
    enableHiding: false,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <ColumnHeader type='sites' column={column} title='updatedAt' />
    ),
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
    sortingFn: 'datetime',
    enableHiding: false,
  },
];
