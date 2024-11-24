'use client';

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/[lng]/components/ui/sites/tableSites';

import { useCallback, useEffect, useState } from 'react';
import FilterInput from '@/[lng]/components/FilterInput';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useTranslation } from '@/i18n/client';
import { DropMenuStatus } from '@/[lng]/components/Site/Table/DropMenuStatus';
import { SearchX } from 'lucide-react';
import PaginationControls from '@/[lng]/components/PaginationControllers';
import DatePicker from '@/[lng]/components/DatePicker';
import SkeletonRows from '@/[lng]/components/SkeletonRows';
import { useDebounce } from 'use-debounce';
import { getSites } from '@/[lng]/services/siteService';
import { SiteDatum } from '@/types/sitesResponse';
import { siteAllColumns } from '@/[lng]/components/Site/Table/AllColumns';
import NewSiteDialog from '@/[lng]/components/Site/NewSiteDialog';
import { DropMenuExport } from "@/[lng]/components/DropMenuExport";
import { Filter } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  lng: string;
  type: string;
}

export function SiteTable<TData, TValue>({
  lng,
  type,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation(lng, 'sites');

  const [sites, setSites] = useState([] as SiteDatum[]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [filterValues, setFilterValues] = useState({
    name: '',
    createdAt: '',
    status: undefined as boolean | undefined,
  });
  const [debouncedFilterValues] = useDebounce(filterValues, 300);
  const [showFilters, setShowFilters] = useState(false);

  const handleDateChange = (selectedDate: Date | undefined) => {
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : '';
    setFilterValues({
      ...filterValues,
      createdAt: formattedDate,
    });
  };

  const handleStatusFilterChange = (status: boolean | undefined) => {
    setFilterValues((prev) => ({
      ...prev,
      status,
    }));    
  }
  
  useEffect(() => {
    const newFilters = Object.keys(debouncedFilterValues).map((key) => ({
      id: key,
      value: debouncedFilterValues[key as keyof typeof debouncedFilterValues],
    }));
    setFilters(newFilters as ColumnFiltersState);
  }, [debouncedFilterValues]);

  const fetchSites = useCallback(async () => {
    setIsTableLoading(true);
    try {
      const filterObj = filters.reduce(
        (acc, filter) => {
          if (filter.id === 'name' || filter.id === 'createdAt') {
            acc[filter.id] = filter.value as string | undefined;
          } else if (filter.id === 'status') {
            acc[filter.id] = filter.value as boolean | undefined;
          }
          return acc;
        },
        {} as { name?: string; createdAt?: string; status?: boolean }
      );

      const response = await getSites(
        pagination.pageIndex + 1,
        pagination.pageSize,
        filterObj
      );

      // Thanks to Stiven for help <3
      setSites(response.SitePaginated.data);
      setPageCount(response.SitePaginated.totalPages);
    } catch (error: any) {
      console.error(error.response?.data?.message || error.message);
    } finally {
      setIsTableLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, filters]);

  const fetchAllSites = useCallback(async () => {
    try {
      const filterObj = filters.reduce(
        (acc, filter) => {
          if (filter.id === 'name' || filter.id === 'createdAt') {
            acc[filter.id] = filter.value as string | undefined;
          } else if (filter.id === 'status') {
            acc[filter.id] = filter.value as boolean | undefined;
          }
          return acc;
        },
        {} as { name?: string; createdAt?: string; status?: boolean }
      );

      const response = await getSites(
        pagination.pageIndex + 1,
        1000,
        filterObj
      );

      return response.SitePaginated.data || [];
    } catch (error: any) {
      console.error(error.response?.data?.message || error.message);
      return [];
    }
  }, [pagination.pageIndex, filters]);

  useEffect(() => {
    if (filters.length > 0) {
      fetchSites();
    }
  }, [pagination.pageIndex, pagination.pageSize, filters, fetchSites]);

  const formatLocale = lng === 'es' ? es : enUS;

  const columns = siteAllColumns({ reloadData: fetchSites, lng, type });

  const table = useReactTable({
    data: sites,
    columns,
    manualPagination: true,
    pageCount,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setFilters,
    state: {
      sorting,
      columnFilters: filters,
      pagination,
    },
  });

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl text-text-primary dark:text-dark-text-primary">
            {t(type === 'manage' ? 'layout_title_manage' : 'layout_title_list')}
          </h1>
          {type === 'manage' ? (
            <NewSiteDialog lng={lng} reloadData={fetchSites} />
          ) : (
            <DropMenuExport lng={lng} fetchAllData={fetchAllSites} type="sites" />
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white dark:bg-dark-primary dark:text-white"
          >
            <Filter className="w-4 h-4" />
            {t('filter')}
          </button>
        </div>
      </div>
  
      {/* Contenedor de Filtros con Animación */}
      <div
        className={`flex flex-wrap items-center gap-4 mb-5 overflow-hidden transition-[opacity,max-height,transform] duration-700 ease-in-out ${
          showFilters ? 'max-h-screen opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-3'
        }`}
      >
        <FilterInput
          id="name"
          type="sites"
          placeholder={t('filter_by_name')}
          value={filterValues.name}
          onChange={(event) => setFilterValues({ ...filterValues, name: event.target.value })}
        />
        <DatePicker onChange={handleDateChange} lng={lng} type="sites" />
        <DropMenuStatus
          lng={lng}
          filterValue={filterValues.status}
          setFilterValue={handleStatusFilterChange}
        />
      </div>
  
      {/* Tabla */}
      <div className="mt-2 overflow-hidden rounded-lg border border-gray-300 dark:border-dark-text-secondary shadow">
        <Table className="min-w-full bg-white dark:bg-dark-primary">
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
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {isTableLoading ? (
            <SkeletonRows rows={7} columns={columns.length} />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-gray-300 dark:border-gray-600"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="p-4 text-text-primary dark:text-dark-text-primary"
                      >
                        {cell.column.id === 'createdAt'
                          ? format(
                              new Date(cell.getValue() as string),
                              'dd/MM/yyyy',
                              { locale: formatLocale }
                            )
                          : flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-text-primary dark:text-dark-text-primary"
                  >
                    {t('not_results')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <PaginationControls table={table} lng={lng} />
    </>
  );  
}
