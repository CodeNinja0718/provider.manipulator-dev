import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import type {
  IReservationItem,
  ISalonScheduleItem,
} from 'models/schedule/interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { DateFormat } from 'utils/const';

import Common from './common';
import styles from './styles';

interface SlotColumnProps {
  slotIndex: number;
  data: ISalonScheduleItem;
  date: string;
  reservations: IReservationItem[];
}

const DATE_TIME_FORMAT = DateFormat.YEAR_MONTH_DATE_HOUR_DASH;

const SlotColumn: React.FC<SlotColumnProps> = ({
  data,
  date,
  reservations,
  slotIndex,
}) => {
  const router = useRouter();
  const WORK_TIME_RANGE = useMemo(() => {
    return Common.renderWorkingTimeRange(data, date);
  }, [data, date]);

  const availableTimeSlots = useMemo(() => {
    return Common.renderAvailableTimeSlots(data, date);
  }, [data, date]);

  const reservationList = useMemo(() => {
    const list = reservations || [];
    let timeBooked: string[] = [];
    let startSlot: Record<string, IReservationItem> = {};
    list.forEach((item: any) => {
      if (item.manipulatorId === data._id) {
        startSlot[dayjs.utc(item.startTime).tz().format(DATE_TIME_FORMAT)] =
          item;
        item.slots.forEach((slot: string) =>
          timeBooked.push(dayjs.utc(slot).tz().format(DATE_TIME_FORMAT)),
        );
      } else {
        startSlot = {};
        timeBooked = [];
      }
    });

    return {
      timeBooked,
      startSlot,
    };
  }, [data, reservations]);

  return (
    <Stack sx={styles.slotColumn}>
      <Box
        sx={styles.manipulatorName}
        height={50}
        className={`${slotIndex % 2 === 1 ? ' evenItem' : ''}`}
      >
        <Link
          href={`/my-page/schedule/working-time?date=${date}&manipulator=${data._id}`}
        >
          <Typography>{data.name}</Typography>
          <span className="triangleIcon"></span>
        </Link>
      </Box>
      {WORK_TIME_RANGE.map((range, index) => {
        const isAvailable = availableTimeSlots?.includes(range[0] || '');
        const isBooked = reservationList?.timeBooked?.includes(range[0] || '');
        const reservation: IReservationItem | undefined =
          reservationList?.startSlot[range[0] || ''];
        const reservationSlot = reservation?.slots?.length || 0;

        return (
          <Button
            key={index}
            sx={styles.slotCell}
            // disabled={!isAvailable || isBooked}
            disabled={isBooked}
            data-available={isAvailable}
          >
            {reservation && (
              <Box
                sx={styles.slotBooked}
                height={`calc(calc(40px * ${
                  reservationSlot > 0 ? reservationSlot - 1 : 0
                }) - 4px)`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`reservation/${reservation?.id}`);
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
