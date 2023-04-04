import ArrowRight from '@icons/arrow-right.svg';
import ScheduleSvg from '@icons/icon_schedule.svg';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { IReservationItem } from 'models/reservation/interface';
import { useRouter } from 'next/router';
import { NumericFormat } from 'react-number-format';
import { RESERVATION_STATUS } from 'utils/const';

import styles from './styles';

interface ReservationCartProps {
  data: IReservationItem;
}

const ReservationCart: React.FC<ReservationCartProps> = ({ data }) => {
  const router = useRouter();

  const handleOpenReservationDetail = () => {
    const { pathname } = router;
    router.push(`${pathname}/${data?._id}`);
  };

  const handleOpenTreatmentReservation = () => {
    const { pathname } = router;
    router.push(`${pathname}/${data?._id}/?isShowTreatment=true`);
  };

  return (
    <Box sx={styles.reservationCartWrapper}>
      <Grid container gap={10}>
        <Grid item xs="auto">
          <Box sx={styles.scheduleIcon}>
            <ScheduleSvg />
          </Box>
        </Grid>
        <Grid item xs={true}>
          <Stack spacing={12} divider={<Divider flexItem />}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'start', md: 'center' }}
              spacing={20}
            >
              <Box>
                {`${dayjs.utc(data.startTime).tz().format('HH:mm')} ~ ${dayjs
                  .utc(data.endTime)
                  .tz()
                  .format('HH:mm')}`}
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
                <Box>
                  <NumericFormat
                    value={data.result?.menuInfo?.price || 0}
                    thousandSeparator=","
                    suffix="円"
                    displayType="text"
                    renderText={(value) => {
                      return value;
                    }}
                  />
                </Box>
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
                onClick={handleOpenReservationDetail}
                sx={styles.button}
                endIcon={<ArrowRight />}
              >
                詳細
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleOpenTreatmentReservation}
                sx={styles.button}
                disabled={RESERVATION_STATUS.DONE === data?.status}
                className={`${
                  RESERVATION_STATUS.DONE === data?.status ? 'btn-done' : {}
                }`}
                startIcon={
                  RESERVATION_STATUS.DONE === data?.status && <CheckIcon />
                }
              >
                {RESERVATION_STATUS.DONE === data?.status ? '済み' : '完了'}
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ReservationCart;
