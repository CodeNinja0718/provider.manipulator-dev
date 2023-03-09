import ArrowRight from '@icons/arrow-right.svg';
import { Box, Button, Stack, Typography } from '@mui/material';
import BackButton from 'components/BackButton';
import Layout from 'components/Layout';
import CustomerDetail from 'components/Reservation/ReservationDetail/CustomerDetail';
import ReservationContent from 'components/Reservation/ReservationDetail/ReservationContent';

import styles from './styles';

const ReservationDetailPage = () => {
  return (
    <Box sx={styles.reservationDetailWrapper}>
      <Box sx={styles.backButtonBox}>
        <BackButton />
      </Box>
      <Box display="flex" justifyContent="center" margin={'24px 0px 0'}>
        <Typography variant="title">予約詳細</Typography>
      </Box>

      <Box display="flex" flexDirection="column" sx={styles.contentBox}>
        <Box>
          <CustomerDetail />
          <Box textAlign={'center'}>
            <Button
              variant="outlined"
              endIcon={<ArrowRight />}
              sx={styles.buttonViewDetail}
              onClick={() => {}}
            >
              詳細を見る
            </Button>
          </Box>
        </Box>
        <ReservationContent />
        <Stack spacing={20} direction="column" alignItems="center">
          <Button
            variant="contained"
            endIcon={<ArrowRight />}
            sx={styles.button}
            onClick={() => {}}
          >
            完了報告する
          </Button>
          <Button
            variant="outlined"
            endIcon={<ArrowRight />}
            sx={styles.button}
            onClick={() => {}}
          >
            予約をキャンセルする
          </Button>
        </Stack>
        <Box textAlign={'center'} mb={30}>
          <BackButton
            isHideArrow
            {...{ fontSize: 16, textDecoration: 'underline' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

ReservationDetailPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default ReservationDetailPage;
