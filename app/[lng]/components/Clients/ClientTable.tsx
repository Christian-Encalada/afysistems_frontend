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

import { getClients } from '../../services/clientsService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/tableClient';
import { Datum } from '@/types/clientsResponse';
import { clientsColumns } from './Columns';
import PaginationControls from '../PaginationControllers';
import { ColumnToggle } from '../ColumnToggle';
import { useTranslation } from '@/i18n/client';
import FilterInput from '../FilterInput';
import { toast } from 'react-toastify';
import NewClientDialog from './NewClientDialog';
import DatePicker from '../DatePicker';
import SkeletonRows from '../SkeletonRows';
import CantonFilter from '../CantonFilter';
import { DropMenuExport } from "@/[lng]/components/DropMenuExport";
import { Filter } from 'lucide-react';

export default function ClientTable({ lng, type }: { lng: string, type: string }) {
  const { t } = useTranslation(lng, 'clients');
  const [data, setData] = useState([] as Datum[]);
  const [pageCount, setPageCount] = useState(0);
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filterValues, setFilterValues] = useState({
    name: '',
    lastName: '',
    document: '',
    createdAt: '',
    cantonName: '',
  });
  const [debouncedFilterValues] = useDebounce(filterValues, 300);
  const [showFilters, setShowFilters] = useState(false);

  const handleCantonSelect = (cantonName: string) => {
    setFilterValues({
      ...filterValues,
      cantonName: cantonName,
    });
  };

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
    const newFilters = Object.keys(debouncedFilterValues).map((key) => ({
      id: key,
      value: debouncedFilterValues[key as keyof typeof debouncedFilterValues],
    }));
    setFilters(newFilters as ColumnFiltersState);
  }, [debouncedFilterValues]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const filterObj = filters.reduce(
      (acc, filter) => {
        if (
          filter.id === 'name' ||
          filter.id === 'lastName' ||
          filter.id === 'document' ||
          filter.id === 'createdAt' ||
          filter.id === 'cantonName'
        ) {
          acc[filter.id] = filter.value as string | undefined;
        }
        return acc;
      },
      {} as {
        name?: string;
        lastName?: string;
        document?: string;
        createdAt?: string;
        cantonName?: string;
      }
    );
    try {
      const response = await getClients(
        pagination.pageIndex + 1,
        pagination.pageSize,
        filterObj
      );
      setData(response.ClientsPaginated.data);
      setPageCount(response.ClientsPaginated.totalPages);
    } catch (error) {
      toast.error(error as any, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, filters]);

  const fetchAllClients = useCallback(async () => {
    try {
      const filterObj = filters.reduce(
        (acc, filter) => {
          if (
            filter.id === 'name' ||
            filter.id === 'lastName' ||
            filter.id === 'document' ||
            filter.id === 'createdAt' ||
            filter.id === 'cantonName'
          ) {
            acc[filter.id] = filter.value as string | undefined;
          }
          return acc;
        },
        {} as {
          name?: string;
          lastName?: string;
          document?: string;
          createdAt?: string;
          cantonName?: string;
        }
      );

      const response = await getClients(
        pagination.pageIndex + 1,
        1000,
        filterObj
      );

      return response.ClientsPaginated.data || [];
    } catch (error: any) {
      console.error(error.response?.data?.message || error.message);
      return [];
    }
  }, [pagination.pageIndex, filters]);

  useEffect(() => {
    if (filters.length > 0) {
      fetchData();
    }
  }, [pagination.pageIndex, pagination.pageSize, filters, fetchData]);

  const columns = clientsColumns({ reloadData: fetchData, lng, type: type });

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

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl text-text-primary dark:text-dark-text-primary">
            {t(type === 'manage' ? 'manage' : type === 'list' ? 'list' : 'report')}
          </h1>
          {type === 'manage' ? (
            <NewClientDialog lng={lng} reloadData={fetchData} />
          ) : (
            <DropMenuExport lng={lng} fetchAllData={fetchAllClients} type="clients" />
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
          <ColumnToggle table={table} lng={lng} />
        </div>
      </div>
  
      <div
        className={`flex flex-wrap items-center gap-4 mb-5 overflow-hidden transition-[opacity,max-height,transform] duration-700 ease-in-out ${
          showFilters ? 'max-h-screen opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-3'
        }`}
      >
        <FilterInput
          id="name"
          type="clients"
          placeholder={t('filter_by_name')}
          value={filterValues.name}
          onChange={(event) => setFilterValues({ ...filterValues, name: event.target.value })}
        />
        <FilterInput
          id="lastName"
          type="clients"
          placeholder={t('filter_by_lastName')}
          value={filterValues.lastName}
          onChange={(event) => setFilterValues({ ...filterValues, lastName: event.target.value })}
        />
        <FilterInput
          id="document"
          type="clients"
          placeholder={t('filter_by_document')}
          value={filterValues.document}
          onChange={(event) => setFilterValues({ ...filterValues, document: event.target.value })}
        />
        <CantonFilter onSelect={handleCantonSelect} lng={lng} />
        <DatePicker onChange={handleDateChange} lng={lng} type="clients" />
      </div>
  
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
