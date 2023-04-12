import SearchIcon from '@icons/search.svg';
import {
  Box,
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';
import Layout from 'components/Layout';
import ListPagination from 'components/ListPagination';
import TicketList from 'components/TicketList';

import styles from './styles';

const MOCK_DATA = [
  {
    id: 'cus1',
    customerName: 'unknown 1',
    customerNameKana: 'unknown 1',
    tickets: [
      {
        ticketId: 'tick1',
        name: '山田 花子',
        expiredAt: '2023-04-15T02:40:40.002Z',
        availableCount: 4,
      },
      {
        ticketId: 'tick2',
        name: '山田 太郎',
        expiredAt: '2023-04-12T02:40:40.002Z',
        availableCount: 2,
      },
      {
        ticketId: 'tick3',
        name: '小林 次郎',
        expiredAt: '2023-04-16T02:40:40.002Z',
        availableCount: 6,
      },
      {
        ticketId: 'tick6',
        name: '山田 花子',
        expiredAt: '2023-04-28T02:40:40.002Z',
        availableCount: 10,
      },
    ],
  },
  {
    id: 'cus2',
    customerName: 'unknown 2',
    customerNameKana: 'unknown 2',
    tickets: [
      {
        ticketId: 'tick4',
        name: 'Ticket 1',
        expiredAt: '2023-04-15T02:40:40.002Z',
        availableCount: 4,
      },
      {
        ticketId: 'tick5',
        name: 'Ticket 2',
        expiredAt: '2023-04-18T02:40:40.002Z',
        availableCount: 2,
      },
    ],
  },
  {
    id: 'cus3',
    customerName: 'unknown 3',
    customerNameKana: 'unknown 3',
    tickets: [],
  },
];

const TicketsPage = () => {
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
          onChange={() => {}}
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
      <TicketList data={MOCK_DATA} />
      <Box display={'flex'}>
        <ListPagination total={0} />
      </Box>
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
