import { TableCell, TableRow } from '@mui/material';
import { Header, HeaderGroup, flexRender } from '@tanstack/react-table';
import Styled from '../table.styled';

type HeaderRowProps<R> = {
  headerGroup: HeaderGroup<R>;
};

export const HeaderRow = <R,>({ headerGroup }: HeaderRowProps<R>) => {
  const handleResize = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>,
    header: Header<R, unknown>
  ) => {
    event.stopPropagation();

    return header.getResizeHandler();
  };

  return (
    <TableRow>
      {headerGroup.headers.map((header) => (
        <TableCell
          component="th"
          colSpan={header.colSpan}
          sx={{
            width: header.getSize(),
            position: 'relative',
            cursor: header.column.getCanSort() ? 'pointer' : 'default',
          }}
          key={header.id}
          onClick={header.column.getToggleSortingHandler()}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          {{
            asc: ' 🔼',
            desc: ' 🔽',
          }[header.column.getIsSorted() as string] ?? null}
          <Styled.Resizer
            onMouseDown={(event) => handleResize(event, header)(event)}
            onTouchStart={(event) => handleResize(event, header)(event)}
            $isResizing={header.column.getIsResizing()}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};
