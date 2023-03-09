import { Box, Typography } from '@mui/material';
import type { IReservationItem } from 'models/reservation/interface';

import ReservationCart from './ReservationCart';
import ReservationSection from './ReservationSection';
import styles from './styles';

const Reservation = ({
  res,
  reservationList,
}: {
  res: object | any;
  reservationList: Array<IReservationItem[]>;
}) => {
  return res?.totalDocs > 0 ? (
    <Box
      sx={{
        overflow: 'auto',
        height: { xs: 'initial', tablet: '80vh' },
      }}
    >
      {reservationList.map((items: IReservationItem[]) => (
        <ReservationSection
          key={items[0]?.manipulatorInfo?.manipulatorId}
          title={items[0]?.manipulatorInfo?.name || ''}
          avatar={items[0]?.manipulatorInfo?.photos[0]?.url || ''}
        >
          {items.map((item: IReservationItem) => (
            <ReservationCart key={item._id} data={item} />
          ))}
        </ReservationSection>
      ))}
    </Box>
  ) : (
    <Typography variant="subtitle1" sx={styles.emptyText}>
      空のリスト
    </Typography>
  );
};

export default Reservation;
