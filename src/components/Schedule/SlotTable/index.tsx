import { CircularProgress, Stack } from '@mui/material';
import { useFetch } from 'hooks';
import reservationQuery from 'models/reservation/query';
import type {
  IReservationItem,
  ISalonScheduleItem,
} from 'models/schedule/interface';
import { useMemo } from 'react';
import { useScrollContainer } from 'react-indiana-drag-scroll';

import Common from './common';
import SlotColumn from './SlotColumn';
import styles from './styles';
import TimeColumn from './TimeColumn';

interface SlotTableProps {
  list: ISalonScheduleItem[];
  date: string;
  loading?: boolean;
  salonId: string;
  isOwner: boolean;
}

const SlotTable: React.FC<SlotTableProps> = ({
  list,
  date,
  loading,
  salonId,
  isOwner,
}) => {
  const scrollContainer = useScrollContainer();
  const { data: res } = useFetch<IReservationItem | any>(
    reservationQuery.getReservationList({ date, salonId }),
  );

  const reservations = useMemo(() => {
    return Common.getReservations(res, date);
  }, [date, res]);

  return (
    <Stack direction="row" alignItems="start" sx={styles.slotTableWrapper}>
      <TimeColumn />
      {loading ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          flex={1}
          height="100%"
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Stack
          direction="row"
          id="slot-columns"
          ref={scrollContainer.ref}
          sx={{ width: '100%' }}
        >
          {list.map((item, index) => {
            return (
              <SlotColumn
                key={item._id}
                data={item}
                date={date}
                reservations={reservations || []}
                slotIndex={index}
                isOwner={isOwner}
              />
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};

export default SlotTable;
