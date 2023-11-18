import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Collapse, IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { Row as ReactTableRow, flexRender } from '@tanstack/react-table';
import React, { useState } from 'react';
import { ActionsMenu } from '.';
import { GetRowPropsType, MetaType } from '../interface';
import Highlighter from 'react-highlighter';

type RowProps<R, F extends GetRowPropsType<R>> = {
  row: ReactTableRow<R>;
  getRowProps?: F;
  searchString?: string;
};

export const Row = <R, F extends GetRowPropsType<R>>({ row, getRowProps, searchString }: RowProps<R, F>) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          ...(getRowProps && { '& > *': { borderBottom: 'none' } }),
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {row.getVisibleCells().map((cell) => {
          const meta = cell.column.columnDef.meta as MetaType;

          return (
            <TableCell
              key={cell.id}
              component="th"
              scope="row"
              sx={{ maxWidth: cell.column.getSize(), whiteSpace: 'nowrap' }}
            >
              <Tooltip
                placement="top-start"
                title={
                  !cell.id.includes('select') &&
                  !cell.id.includes('actions') &&
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                }
              >
                <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {meta?.withChevron && (
                    <IconButton size="small">{expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</IconButton>
                  )}
                  {meta?.actions?.length ? (
                    <ActionsMenu row={row} actions={meta.actions} />
                  ) : searchString ? (
                    meta?.flexRender ? (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    ) : (
                      <Highlighter search={searchString}>{cell.getValue()}</Highlighter>
                    )
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </Box>
              </Tooltip>
            </TableCell>
          );
        })}
      </TableRow>
      {getRowProps && (
        <TableRow>
          <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              {getRowProps({ row })}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};
