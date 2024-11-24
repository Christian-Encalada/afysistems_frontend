import { TemplateDatum } from '@/types/templatesResponse';
import { ColumnDef } from '@tanstack/react-table';
import ColumnHeader from '../ColumnHeader';
import DeleteTemplate from './DeleteTemplate';
import UpdateTemplate from './UpdateTemplate';
import DataTableStatusHeader from "@/[lng]/components/Site/Table/StatusHeader";

export const templatesColumns = ({
  handleDelete,
  reloadData,
  lng,
}: {
  handleDelete: (id: number) => void;
  reloadData: () => void;
  lng: string;
}): ColumnDef<TemplateDatum>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader type='templates' column={column} title='name' />
    ),
    sortingFn: 'alphanumeric',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <ColumnHeader type='templates' column={column} title='createdAt' />
    ),
    sortingFn: 'datetime',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader type='templates' column={column} title='status' />,
    cell: ({ row }) => {
      const status = row.original.status;
      return <DataTableStatusHeader status={status} />;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <ColumnHeader type='templates' column={column} title='actions' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center justify-center gap-x-2'>
        <UpdateTemplate templateData={row.original} reloadData={reloadData} lng={lng} />
        <DeleteTemplate onDelete={() => handleDelete(row.original.id)} />
      </div>
    ),
    enableSorting: false,
  },
];
