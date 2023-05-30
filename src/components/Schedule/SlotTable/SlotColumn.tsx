import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import type {
  IReservationItem,
  ISalonScheduleItem,
} from 'models/schedule/interface';
import Link from 'next/link';
import { useMemo } from 'react';
import { WORK_TIMES } from 'utils/const';

import styles from './styles';

interface SlotColumnProps {
  data: ISalonScheduleItem;
  date: string;
}

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

const SlotColumn: React.FC<SlotColumnProps> = ({ data, date }) => {
  const WORK_TIME_RANGE = useMemo(
    () =>
      WORK_TIMES.slice(0, -1).map((_time, index) => [
        dayjs(`${date} ${WORK_TIMES[index]}`, DATE_TIME_FORMAT).format(
          DATE_TIME_FORMAT,
        ),
        dayjs(`${date} ${WORK_TIMES[index + 1]}`, DATE_TIME_FORMAT).format(
          DATE_TIME_FORMAT,
        ),
      ]),
    [date],
  );

  const availableTimeSlots = useMemo(
    () =>
      data.availableTimeSlots.map((time) =>
        dayjs.utc(time).tz().format(DATE_TIME_FORMAT),
      ),
    [data.availableTimeSlots],
  );

  const reservations = useMemo(() => {
    const timeBooked: string[] = [];
    const startSlot: Record<string, IReservationItem> = {};
    data.reservations?.forEach((reservation) => {
      startSlot[
        dayjs.utc(reservation.startTime).tz().format(DATE_TIME_FORMAT)
      ] = reservation;
      reservation.slots.forEach((slot) =>
        timeBooked.push(dayjs.utc(slot).tz().format(DATE_TIME_FORMAT)),
      );
    });
    return {
      timeBooked,
      startSlot,
    };
  }, [data.reservations]);

  return (
    <Stack sx={styles.slotColumn}>
      <Box sx={styles.manipulatorName} height={50}>
        <Link
          href={`/my-page/schedule/working-time?date=${date}&manipulator=${data.manipulatorId}`}
        >
          <Typography>{data.manipulatorName}</Typography>
        </Link>
      </Box>
      {WORK_TIME_RANGE.map((range, index) => {
        const isAvailable = availableTimeSlots.includes(range[0] || '');
        const isBooked = reservations.timeBooked.includes(range[0] || '');
        const reservation: IReservationItem | undefined =
          reservations.startSlot[range[0] || ''];
        const reservationSlot = reservation?.slots?.length || 0;

        return (
          <Button
            key={index}
            sx={styles.slotCell}
            disabled={!isAvailable || isBooked}
            data-available={isAvailable}
          >
            {reservation && (
              <Box
                sx={styles.slotBooked}
                height={
                  reservationSlot * 36 +
                  (reservationSlot > 1 ? reservationSlot * 2 : 0)
                }
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                予約
              </Box>
            )}
          </Button>
        );
      })}
    </Stack>
  );
};

export default SlotColumn;
