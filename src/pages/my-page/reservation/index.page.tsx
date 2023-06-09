import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import ChangeDate from 'components/ChangeDate';
import Layout from 'components/Layout';
import Reservation from 'components/Reservation';
import { useFetch } from 'hooks';
import { groupBy, values } from 'lodash';
import type { IReservationItem } from 'models/reservation/interface';
import reservationQuery from 'models/reservation/query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import helpers from 'utils/helpers';
import type { PageProps } from 'utils/type';

import styles from './styles';

const ReservationPage = () => {
  const router = useRouter();
  const { date } = router.query;
  const validDate = helpers.getValidDate(date);
  const { data: res } = useFetch<IReservationItem | any>(
    reservationQuery.getReservationList(validDate),
  );

  const reservationList = useMemo(() => {
    let dataReturn: Array<IReservationItem[]> = [];
    if (res?.docs) {
      const dataConvert = groupBy(res?.docs, 'manipulatorInfo.manipulatorId');
      dataReturn = values(dataConvert);
    }

    return dataReturn;
  }, [res]);

  return (
    <Box sx={styles.reservationWrapper}>
      <Box display="flex" justifyContent="center">
        <Typography variant="title">予約リスト</Typography>
      </Box>

      <Box display="flex" mt={40} flexDirection="column" gap={40}>
        <ChangeDate />
        {res ? (
          <Reservation res={res} reservationList={reservationList} />
        ) : (
          <Stack
            alignItems="center"
            justifyContent="flex-start"
            sx={styles.wrapper}
          >
            <CircularProgress />
          </Stack>
        )}
      </Box>
    </Box>
  );
};
ReservationPage.getLayout = (page: React.ReactNode, pageProps: PageProps) => {
  return (
    <Layout isCardLayout withSideMenu {...pageProps}>
      {page}
    </Layout>
  );
};
export default ReservationPage;
