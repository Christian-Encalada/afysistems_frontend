import { ColumnDef } from '@tanstack/react-table';
import ColumnHeader from '@/[lng]/components/ColumnHeader';
import UpdateSiteDialog from '@/[lng]/components/Site/UpdateSiteDialog';
import DataTableStatusHeader from '@/[lng]/components/Site/Table/StatusHeader';
import UpdateStatusSite from '@/[lng]/components/Site/UpdateStatusSite';
import { SiteDatum } from '@/types/sitesResponse';
import DataTableColorHeader from '@/[lng]/components/Site/Table/ColorHeader';
import DataTableLogoHeader from '@/[lng]/components/Site/Table/LogoHeader';
import DataTableTemplateHeader from '@/[lng]/components/Site/Table/TemplateHeader';

export const siteAllColumns = ({
  reloadData,
  lng,
  type,
}: {
  reloadData: () => void;
  lng: string;
  type: string;
}): ColumnDef<SiteDatum>[] => {
  const columns: ColumnDef<SiteDatum>[] = [
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
      enableColumnFilter: false,
    },
    {
      accessorKey: 'primaryColor',
      header: ({ column }) => (
        <ColumnHeader type='sites' column={column} title='primaryColor' />
      ),
      cell: ({ row }) => {
        const color = row.original.primaryColor;
        return <DataTableColorHeader color={color} />;
      },
      enableSorting: false,
      enableHiding: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: 'secondaryColor',
      header: ({ column }) => (
        <ColumnHeader type='sites' column={column} title='secondaryColor' />
      ),
      cell: ({ row }) => {
        const color = row.original.secondaryColor;
        return <DataTableColorHeader color={color} />;
      },
      enableSorting: false,
      enableHiding: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: 'template',
      header: ({ column }) => (
        <ColumnHeader type='sites' column={column} title='template' />
      ),
      cell: ({ row }) => {
        const template = row.original.template;
        return <DataTableTemplateHeader template={template} lng={lng} />;
      },
      enableSorting: false,
      enableHiding: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: 'logo',
      header: ({ column }) => (
        <ColumnHeader type='sites' column={column} title='logo' />
      ),
      cell: ({ row }) => {
        const logoName = row.original.logo;
        return <DataTableLogoHeader logoName={logoName} />;
      },
      enableSorting: false,
      enableHiding: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <ColumnHeader type='sites' column={column} title='createdAt' />
      ),
      cell: ({ getValue }) =>
        new Date(getValue() as string).toLocaleDateString(),
      sortingFn: 'datetime',
      enableHiding: false,
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => (
        <ColumnHeader type='sites' column={column} title='updatedAt' />
      ),
      cell: ({ getValue }) =>
        new Date(getValue() as string).toLocaleDateString(),
      sortingFn: 'datetime',
      enableHiding: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <ColumnHeader type='sites' column={column} title='status' />
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <DataTableStatusHeader status={status} />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  if (type === 'manage') {
    columns.push({
      id: 'actions',
      header: ({ column }) => (
        <ColumnHeader type='sites' column={column} title='actions' />
      ),
      cell: ({ row }) => (
        <div className='flex items-center justify-center gap-x-2'>
          <UpdateSiteDialog
            siteData={row.original}
            reloadData={reloadData}
            lng={lng}
          />
          <UpdateStatusSite
            siteData={row.original}
            reloadData={reloadData}
            lng={lng}
          />
        </div>
      ),
      enableSorting: false,
      enableColumnFilter: false,
    });
  }

  return columns;
};
