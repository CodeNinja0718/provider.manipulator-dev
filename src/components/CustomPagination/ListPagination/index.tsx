import type { PaginationProps } from '@mui/material';
import { Pagination, PaginationItem } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './styles';

export interface ListPaginationProps extends PaginationProps {
  total: number;
  limit?: number;
  pathname?: string;
}
const ListPagination = (props: ListPaginationProps) => {
  const { pathname, query } = useRouter();
  const { page, limit = 10 } = query;

  const getPageQuery = (selectedPage: number | null) => {
    const currentQuery = { ...query };
    if (selectedPage) {
      if (selectedPage === 1) {
        delete currentQuery.page;
      } else {
        currentQuery.page = selectedPage.toString();
      }
    }
    return {
      pathname,
      query: currentQuery,
    };
  };
  return (
    <Pagination
      className="list-pagination"
      color="secondary"
      variant="outlined"
      renderItem={(item) => {
        if (!item.disabled) {
          return (
            <Link href={getPageQuery(item.page)}>
              <PaginationItem {...item} />
            </Link>
          );
        }
        return <PaginationItem {...item} />;
      }}
      sx={styles.container}
      // onChange={handlePageChange}
      page={Number(page || 1)}
      count={Math.ceil(props.total / Number(props.limit || limit))}
      {...props}
    />
  );
};

export default ListPagination;
