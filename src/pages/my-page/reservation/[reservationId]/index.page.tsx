import ArrowRight from '@icons/arrow-right.svg';
import { Box, Button, Stack, Typography } from '@mui/material';
import BackButton from 'components/BackButton';
import Layout from 'components/Layout';
import CustomerDetail from 'components/Reservation/ReservationDetail/CustomerDetail';
import ReservationContent from 'components/Reservation/ReservationDetail/ReservationContent';
import ReservationTreatment from 'components/ReservationTreatment';
import { useFetch } from 'hooks';
import type { IReservationItem } from 'models/reservation/interface';
import reservationQuery from 'models/reservation/query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import styles from './styles';

const ReservationDetailPage = () => {
  const router = useRouter();
  const { data: res } = useFetch<IReservationItem | any>(
    reservationQuery.reservationDetail(router?.query?.reservationId),
  );
  const reservationData = {
    ...res?.result,
    startTime: res?.startTime,
    endTime: res?.endTime,
    salonInfo: res?.salonInfo,
  };
  const isShowTreatment = useMemo(() => {
    return router?.query?.isShowTreatment;
  }, [router]);
  const titleText = isShowTreatment ? '施術完了' : '予約詳細';
  const Component = () => {
    return isShowTreatment ? (
      <ReservationTreatment {...reservationData} />
    ) : (
      <ReservationContent {...reservationData} />
    );
  };

  return (
    <Box sx={styles.reservationDetailWrapper}>
      {!isShowTreatment && (
        <Box sx={styles.backButtonBox}>
          <BackButton />
        </Box>
      )}
      <Box display="flex" justifyContent="center" sx={styles.title}>
        <Typography variant="title">{titleText}</Typography>
      </Box>

      <Box display="flex" flexDirection="column" sx={styles.contentBox}>
        {/* Customer Info */}
        <Box>
          <CustomerDetail {...res?.customerInfo} />
        </Box>

        {/* Reservation Info/ Treatment Info */}
        <Box mt={isShowTreatment ? 0 : 40}>
          <Component />
        </Box>

        <Stack spacing={20} mt={40} direction="column" alignItems="center">
          <Button
            variant="contained"
            endIcon={<ArrowRight />}
            sx={styles.button}
            onClick={() =>
              !isShowTreatment &&
              router.push(
                `/my-page/reservation/${router?.query?.reservationId}?isShowTreatment=true`,
              )
            }
          >
            {isShowTreatment ? '決済確認へ' : '完了報告する'}
          </Button>
        </Stack>
        {!isShowTreatment && (
          <Box textAlign={'center'} mb={30} mt={40}>
            <BackButton
              isHideArrow
              {...{ fontSize: 16, textDecoration: 'underline' }}
            />
          </Box>
        )}
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
