import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Table } from '@tanstack/react-table';

type PaginationProps<R> = {
  table: Table<R>;
};

export const Pagination = <R,>({ table }: PaginationProps<R>) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="body2" component="span">
        {table.getFilteredRowModel().rows.length} Results
      </Typography>
      <FormControl size="small" sx={{ ml: 1 }}>
        <InputLabel>Show</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={10}
          value={table.getState().pagination.pageSize}
          label="Age"
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 50, 100].map((pageSize) => (
            <MenuItem value={pageSize} key={pageSize}>
              {pageSize}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        <ChevronLeft />
      </IconButton>
      <IconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        <ChevronRight />
      </IconButton>
    </Box>
  );
};
