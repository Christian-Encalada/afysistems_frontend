'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { useDebounce } from 'use-debounce';
import { deleteUser, getUsers } from '../../services/usersService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/[lng]/components/ui/tableClient';
import { UserDatum } from '@/types/usersResponse';
import { usersColumns } from './Columns';
import PaginationControls from '../PaginationControllers';
import { ColumnToggle } from '../ColumnToggle';
import { useTranslation } from '@/i18n/client';
import FilterInput from '../FilterInput';
import { toast } from 'react-toastify';
import NewUserDialog from './NewUserDialog';
import DatePicker from '../DatePicker';
import SkeletonRows from '../SkeletonRows';
import { DropMenuStatus } from '@/[lng]/components/Site/Table/DropMenuStatus';
import { RoleFilter } from '../RoleFilter';
import { Filter } from 'lucide-react';

export default function UserTable({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'users');

  const [data, setData] = useState([] as UserDatum[]);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterValues, setFilterValues] = useState<{
    username: string;
    role: string;
    status: boolean | undefined;
    createdAt: string;
  }>({
    username: '',
    role: '',
    status: undefined,
    createdAt: '',
  });
  const [debouncedFilterValues] = useDebounce(filterValues, 300);

  const handleDateChange = (selectedDate: Date | undefined) => {
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : '';
    setFilterValues({
      ...filterValues,
      createdAt: formattedDate,
    });
  };

  useEffect(() => {
    const newFilters = Object.keys(debouncedFilterValues)
      .filter(
        (key) =>
          debouncedFilterValues[key as keyof typeof debouncedFilterValues] !==
          undefined
      )
      .map((key) => ({
        id: key,
        value: debouncedFilterValues[key as keyof typeof debouncedFilterValues],
      }));
    setFilters(newFilters as ColumnFiltersState);
  }, [debouncedFilterValues]);

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteUser(id);
      if (response.message) {
        toast.success(response.message, { autoClose: 2000 });
      }
      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`, {
        autoClose: 2000,
      });
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const filterObj = filters.reduce(
      (acc, filter) => {
        if (
          filter.id === 'username' ||
          filter.id === 'role' ||
          filter.id === 'status' ||
          filter.id === 'createdAt'
        ) {
          acc[filter.id] = String(filter.value);
        }
        return acc;
      },
      {} as {
        username?: string;
        role?: string;
        status?: string;
        createdAt?: string;
      }
    );

    try {
      const response = await getUsers(
        pagination.pageIndex + 1,
        pagination.pageSize,
        filterObj
      );
      setData(response.UsersPaginated.data);
      setPageCount(response.UsersPaginated.totalPages);
    } catch (error) {
      toast.error(error as any, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, filters]);

  useEffect(() => {
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, filters, fetchData]);

  const columns = usersColumns({ handleDelete, reloadData: fetchData, lng });

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualFiltering: true,
    pageCount: pageCount,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilters,
    state: { pagination, sorting, columnFilters: filters },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl text-text-primary dark:text-dark-text-primary">{t('manage')}</h1>
          <NewUserDialog lng={lng} reloadData={fetchData} />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white dark:bg-dark-primary dark:text-white"
          >
            <Filter className="w-4 h-4" />
            {t('filter')}
          </button>
          <ColumnToggle table={table} lng={lng} />
        </div>
      </div>

      {/* Contenedor de Filtros con Animación */}
      <div
  className={`flex flex-wrap items-center gap-4 mb-5 overflow-hidden transition-[opacity,max-height,transform] duration-700 ease-in-out ${
    showFilters ? 'max-h-screen opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-3'
  }`}
      >
        <FilterInput
          id="username"
          type="users"
          placeholder={t('filter_by_username')}
          value={filterValues.username}
          onChange={(event) =>
            setFilterValues({ ...filterValues, username: event.target.value })
          }
        />
        <RoleFilter
          lng={lng}
          filterValue={filterValues.role}
          setFilterValue={(value) =>
            setFilterValues({ ...filterValues, role: value })
          }
        />
        <DropMenuStatus
          lng={lng}
          filterValue={filterValues.status ?? undefined}
          setFilterValue={(value) =>
            setFilterValues({ ...filterValues, status: value })
          }
        />
        <DatePicker onChange={handleDateChange} lng={lng} type="users" />
      </div>

      {/* Tabla */}
      <div className="mt-2 overflow-hidden rounded-lg border border-gray-300 dark:border-dark-text-secondary shadow">
        <Table className="min-w-full bg-white dark:bg-dark-primary">
          {/* Table Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-white dark:bg-dark-primary"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`p-4 text-text-primary dark:text-dark-text-primary bg-white dark:bg-dark-primary ${
                      headerGroup.id === '0'
                        ? 'border-b border-border-primary dark:border-border-secondary'
                        : ''
                    }`}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {/* Table Body */}
          {loading ? (
            <SkeletonRows rows={7} columns={columns.length} />
          ) : data.length > 0 ? (
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-300 dark:border-gray-600"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="p-4 text-text-primary dark:text-dark-text-primary"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-text-primary dark:text-dark-text-primary"
                >
                  {t('no_data')}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>

      <PaginationControls table={table} lng={lng} />
    </>
  );
}
