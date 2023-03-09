import ArrowRight from '@icons/arrow-right.svg';
import ScheduleSvg from '@icons/icon_schedule.svg';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { IReservationItem } from 'models/reservation/interface';
import React from 'react';
import { RESERVATION_STATUS } from 'utils/const';

import styles from './styles';

interface ReservationCartProps {
  data: IReservationItem;
}

const ReservationCart: React.FC<ReservationCartProps> = ({ data }) => {
  return (
    <Box sx={styles.reservationCartWrapper}>
      <Grid container gap={10}>
        <Grid item xs="auto">
          <Box
            sx={{
              pt: 1,
              svg: {
                width: 20,
                height: 20,
                path: { fill: '#6b6b6b !important' },
              },
            }}
          >
            <ScheduleSvg />
          </Box>
        </Grid>
        <Grid item xs={true}>
          <Stack spacing={12} divider={<Divider flexItem />}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={20}>
              <Box>
                {`${dayjs.utc(data.startTime).tz().format('hh:mm')} ~ ${dayjs
                  .utc(data.endTime)
                  .tz()
                  .format('hh:mm')}`}
              </Box>
              <Typography fontSize={18} fontWeight={600}>
                {data.customerInfo?.name}
              </Typography>
            </Stack>
            <Stack>
              <Typography fontSize={16} fontWeight={600} mb={5}>
                {data.result?.menuInfo?.name}
              </Typography>
              <Stack spacing={20} direction={'row'}>
                <Box>{data.result?.menuInfo?.estimatedTime}分</Box>
                <Box>{data.result?.menuInfo?.price}円</Box>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs="auto">
          <Box>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={10}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => {}}
                sx={styles.button}
                endIcon={<ArrowRight />}
              >
                詳細
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() => {}}
                sx={styles.button}
                className={`${
                  RESERVATION_STATUS.DONE === data?.status ? 'btn-done' : {}
                }`}
                startIcon={
                  RESERVATION_STATUS.DONE === data?.status && <CheckIcon />
                }
              >
                完了
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ReservationCart;
