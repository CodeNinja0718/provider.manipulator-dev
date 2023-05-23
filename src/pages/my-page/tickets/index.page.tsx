import SearchIcon from '@icons/search.svg';
import {
  Box,
  CircularProgress,
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';
import Layout from 'components/Layout';
import ListPagination from 'components/ListPagination';
import TicketList from 'components/TicketList';
import { useList, useUser } from 'hooks';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import type { ICustomerTickets } from 'models/tickets/interface';
import ticketQuery from 'models/tickets/query';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import styles from './styles';

const TicketsPage = () => {
  const router = useRouter();
  const { keyword, page } = router.query;
  const [searchText, setSearchText] = useState('');
  const { data } = useUser();

  useEffect(() => {
    setSearchText(typeof keyword === 'string' ? keyword : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const {
    list,
    isLoading,
    page: currentPage,
    total,
  } = useList<ICustomerTickets>({
    ...ticketQuery.getSalonTickets({
      salonId: get(data, 'salon[0].salonId'),
      keyword,
      page: typeof page === 'string' ? page : 1,
    }),
    enabled: !!data,
    staleTime: 1000 * 60 * 2,
  });

  const debounceRedirect = useRef(
    debounce(
      (queryValue) =>
        router.push(
          {
            pathname: router.pathname,
            query: queryValue,
          },
          undefined,
          { shallow: true },
        ),
      500,
    ),
  ).current;

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    const currentQuery = { ...router.query };
    if (!e.target.value) {
      delete currentQuery.keyword;
    } else {
      currentQuery.keyword = e.target.value;
    }

    debounceRedirect(currentQuery);
  };

  const getContentRendering = () => {
    let content;
    if (isLoading) {
      content = (
        <Stack
          alignItems="center"
          justifyContent="flex-start"
          minHeight={570}
          paddingTop={24}
        >
          <CircularProgress />
        </Stack>
      );
    } else if (list && list.length > 0) {
      content = <TicketList data={list} />;
    } else {
      content = (
        <Typography variant="subtitle1" sx={styles.emptyText}>
          空のリスト
        </Typography>
      );
    }

    return content;
  };

  return (
    <Stack alignItems={'center'} sx={styles.ticketListContainer}>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant="title" mb={55}>
          回数券管理
        </Typography>
      </Box>
      <Box
        display={'flex'}
        justifyItems={'center'}
        flexDirection={'column'}
        alignSelf={'stretch'}
        sx={styles.searchWrapper}
      >
        <TextField
          fullWidth
          placeholder="顧客検索"
          value={searchText}
          onChange={onTextChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={styles.inputIcon}>
                <SvgIcon component={SearchIcon} viewBox="0 0 39 42" />
              </InputAdornment>
            ),
          }}
        />
        <Typography fontSize={14} sx={{ pt: 20 }}>
          ※リストをタップすると、お客様とのチャット画面が開きます。
        </Typography>
      </Box>
      {getContentRendering()}
      {list && list.length > 0 && (
        <Box display={'flex'}>
          <ListPagination total={total} page={currentPage} />
        </Box>
      )}
    </Stack>
  );
};

TicketsPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default TicketsPage;
