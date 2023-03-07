import { Box, Typography } from '@mui/material';
import ChangeDate from 'components/ChangeDate';
import Layout from 'components/Layout';
import ReservationCart from 'components/Reservation/ReservationCart';
import ReservationSection from 'components/Reservation/ReservationSection';
import type { IReservationItem } from 'models/reservation/interface';

import styles from './styles';

const ReservationPage = () => {
  const dataMock: IReservationItem[] = [
    {
      _id: '',
      startTime: '2023-02-16T00:00:00.000Z',
      endTime: '2023-02-16T00:30:00.000Z',
      customerInfo: {
        name: '山田花子様',
        nameKana: '山田花子様',
      },
      manipulatorInfo: {
        name: '整体師太郎',
        nameKana: '整体師太郎',
        photos: [],
      },
      result: {
        menuInfo: {
          name: '時間予約コース',
          estimatedTime: 120,
          price: 600,
          currency: 'JPY',
        },
      },
    },
  ];
  return (
    <Box sx={styles.reservationWrapper}>
      <Box display="flex" justifyContent="center">
        <Typography variant="title">予約リスト</Typography>
      </Box>

      <Box display="flex" mt={40} flexDirection="column" gap={40}>
        <ChangeDate />
        <Box
          sx={{
            overflow: 'auto',
            height: { xs: 'initial', tablet: '80vh' },
          }}
        >
          <ReservationSection
            title={dataMock[0]?.manipulatorInfo?.name || ''}
            avatar={dataMock[0]?.manipulatorInfo?.photos[0]?.url || ''}
          >
            <ReservationCart data={dataMock[0]!} />
            <ReservationCart data={dataMock[0]!} />
            <ReservationCart data={dataMock[0]!} />
            <ReservationCart data={dataMock[0]!} />
          </ReservationSection>
          <ReservationSection
            title={dataMock[0]?.manipulatorInfo?.name || ''}
            avatar={dataMock[0]?.manipulatorInfo?.photos[0]?.url || ''}
          >
            <ReservationCart data={dataMock[0]!} />
            <ReservationCart data={dataMock[0]!} />
            <ReservationCart data={dataMock[0]!} />
            <ReservationCart data={dataMock[0]!} />
          </ReservationSection>
          <ReservationSection title="整体師次郎" avatar="">
            <ReservationCart data={dataMock[0]!} />
          </ReservationSection>
        </Box>
      </Box>
    </Box>
  );
};
ReservationPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default ReservationPage;
