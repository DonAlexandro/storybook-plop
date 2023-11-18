import { ColumnDef, Row, RowSelectionState } from '@tanstack/react-table';

export type TableProps<R> = {
  columns: ColumnDef<R>[];
  data: Array<R>;
  getRowProps?: GetRowPropsType<R>;
  pagination?: boolean;
  lazyLoading?: boolean;
  searchString?: string;
  rowSelection?: {
    selectedRows: RowSelectionState;
    setSelectedRows: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  };
};

export type Action = {
  key: string;
  label: string;
  onClick: <R>(row: Row<R>) => void;
};

export type MetaType = {
  withChevron?: boolean;
  actions?: Action[];
  flexRender?: boolean;
};

export type GetRowPropsType<R> = ({ row }: { row: Row<R> }) => JSX.Element | string;
