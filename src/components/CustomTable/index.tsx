import { Box } from '@mui/material';
import type { SortingState, Updater } from '@tanstack/react-table';
import ListPagination from 'components/ListPagination';
import { get } from 'lodash';
import type {
  MaterialReactTableProps,
  MRT_ColumnDef,
  MRT_Row,
} from 'material-react-table';
import MaterialReactTable from 'material-react-table';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export interface CustomTableProps extends MaterialReactTableProps {
  isLoading?: boolean;
  isFetching?: boolean;
  total: number;
  columns: MRT_ColumnDef<Record<string, any>>[];
  onRowClick?: (row: MRT_Row<{}>) => void;
  showPagination?: boolean;
}
const CustomTable = ({
  isLoading,
  isFetching,
  total,
  onRowClick,
  showPagination = true,
  ...rest
}: CustomTableProps) => {
  const { replace, query, pathname } = useRouter();
  const { order, orderBy } = query;

  const sorting: SortingState = useMemo(() => {
    if (!orderBy) {
      return [];
    }
    return [{ id: orderBy as string, desc: order === 'true' }];
  }, [order, orderBy]);

  const handleSortChange = useCallback(
    (updater: Updater<SortingState>) => {
      const searchQuery = { ...query };
      let newSorting;
      if (updater instanceof Function) {
        newSorting = updater(sorting);
      } else {
        newSorting = updater;
      }
      if (get(newSorting, '[0].id')) {
        searchQuery.orderBy = get(newSorting, '[0].id');
        searchQuery.order = get(newSorting, '[0].desc');
      } else {
        delete searchQuery.orderBy;
        delete searchQuery.order;
      }
      replace(
        {
          pathname,
          query: searchQuery,
        },
        undefined,
        {
          shallow: true,
        },
      );
    },
    [pathname, query, replace, sorting],
  );
  return (
    <>
      <MaterialReactTable
        state={{
          isLoading,
          showProgressBars: isFetching,
          sorting,
        }}
        localization={{
          noRecordsToDisplay: 'No data',
        }}
        enablePinning
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        manualSorting
        getRowId={(item) => item._id}
        enableBottomToolbar={false}
        enableToolbarInternalActions={false}
        onSortingChange={handleSortChange}
        muiTopToolbarProps={{
          sx: {
            minHeight: 'unset',
            height: '4px',
            position: 'absolute',
            width: 1,
            zIndex: 3,
            display: isFetching ? 'block' : 'none',
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            '& .MuiTableRow-root': {
              boxShadow: 'none',
            },
            fontSize: '16px',
            color: 'heading',
            py: 2,

            '& .MuiSvgIcon-root': {
              marginLeft: 1,
            },
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            fontSize: '16px',
            verticalAlign: 'top',
          },
        }}
        muiTablePaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 'unset',
            mt: 2,
            position: 'relative',
          },
        }}
        muiTableContainerProps={{
          sx: {
            borderRadius: 2,
          },
        }}
        muiTableHeadRowProps={{
          sx: {
            boxShadow: 'none',
            '& .MuiTableCell-root': {
              '&:first-of-type': {
                pl: 4,
              },
            },
          },
        }}
        muiTableBodyRowProps={({ row }) => {
          return {
            onClick: () => onRowClick && onRowClick(row),
            sx: {
              '&:last-child': {
                '& .MuiTableCell-root': {
                  borderBottom: 'unset',
                },
              },
              '.MuiTableCell-root': {
                cursor: onRowClick ? 'pointer' : 'unset',
                '&:first-of-type': {
                  pl: 4,
                },
                '&:last-child': {
                  pr: 4,
                },
              },
            },
          };
        }}
        {...rest}
      />
      {total > 0 && showPagination && (
        <Box mt={4} display="flex" justifyContent="center">
          <ListPagination total={total} />
        </Box>
      )}
    </>
  );
};

export default CustomTable;
