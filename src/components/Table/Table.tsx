import { Box, Checkbox, TableContainer } from '@mui/material';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import {
  Table as ReactTable,
  Row as ReactTableRow,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TableProps } from './interface';
import { HeaderRow, Pagination, Row } from './parts';
import { useVirtual } from 'react-virtual';

export function Table<R>({
  columns,
  data,
  getRowProps,
  pagination,
  searchString,
  rowSelection,
  lazyLoading,
}: Readonly<TableProps<R>>) {
  const tableContainerRef = useRef<HTMLTableElement>(null);

  if (rowSelection && !columns.includes({ id: 'select' })) {
    columns.unshift({
      id: 'select',
      size: 25,
      header: ({ table }: { table: ReactTable<R> }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }: { row: ReactTableRow<R> }) => (
        <Box>
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </Box>
      ),
    });
  }

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: 'onChange',
    onRowSelectionChange: rowSelection?.setSelectedRows,
    enableRowSelection: true,
    state: {
      globalFilter: searchString,
      rowSelection: rowSelection?.selectedRows,
    },
    ...((pagination || lazyLoading) && { getPaginationRowModel: getPaginationRowModel() }),
  });

  const [pageSizeToView, setPageSizeToView] = useState(20);

  useEffect(() => {
    if (lazyLoading) {
      table.setPageSize(pageSizeToView);
    }
  }, [table, pageSizeToView, lazyLoading]);

  const fetchMoreOnBottomReached = useCallback((containerRefElement?: HTMLDivElement | null) => {
    if (containerRefElement) {
      const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

      if (scrollHeight - scrollTop - clientHeight < 300) {
        setPageSizeToView((prev) => prev + 5);
      }
    }
  }, []);

  const { rows } = table.getRowModel();
  const { rows: allRows } = table.getFilteredRowModel();

  useEffect(() => {
    if (lazyLoading) {
      fetchMoreOnBottomReached(tableContainerRef.current);
    }
  }, [fetchMoreOnBottomReached, lazyLoading]);

  const { virtualItems: virtualRows } = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });

  return (
    <TableContainer
      {...(lazyLoading && {
        sx: { height: 500, width: 'fit-content', overflow: 'auto' },
        onScroll: (e: React.UIEvent<HTMLTableElement, UIEvent>) => {
          if (allRows.length > pageSizeToView) {
            fetchMoreOnBottomReached(e.target as HTMLTableElement);
          }
        },
      })}
    >
      <MuiTable ref={tableContainerRef} sx={{ width: table.getTotalSize() }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <HeaderRow headerGroup={headerGroup} key={headerGroup.id} />
          ))}
        </TableHead>
        <TableBody>
          {lazyLoading
            ? virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index] as ReactTableRow<R>;

                return <Row row={row} getRowProps={getRowProps} key={row.id} searchString={searchString} />;
              })
            : table
                .getRowModel()
                .rows.map((row) => (
                  <Row row={row} getRowProps={getRowProps} key={row.id} searchString={searchString} />
                ))}
        </TableBody>
      </MuiTable>
      {pagination && <Pagination table={table} />}
    </TableContainer>
  );
}
