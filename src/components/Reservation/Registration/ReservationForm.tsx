import { Box, Grid, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { DatePicker, Select } from 'components/Form';
import React, { useMemo } from 'react';
import type { Control } from 'react-hook-form';
import { WORK_TIMES } from 'utils/const';

import FormCoupon from './FormCoupon';
import type { RegistrationFormValues } from './models/schema';
import styles from './styles';

interface IReservationForm {
  control: Control<RegistrationFormValues>;
}

const ReservationForm: React.FC<IReservationForm> = ({ control }) => {
  const timeOptions = useMemo(() => {
    return WORK_TIMES.map((time) => ({
      id: time,
      name: time,
    }));
  }, []);
  return (
    <CommonSection title="予約内容">
      <Box py={20} sx={styles.wrapper}>
        <Grid container spacing={{ xs: 0, tablet: 5 }}>
          <Grid item xs={12} tablet={true}>
            <DatePicker
              placeholder="日にちを選択してください"
              control={control}
              name="date"
              label="予約日時"
            />
          </Grid>
          <Grid item xs={12} tablet={'auto'}>
            <Stack direction="row" gap={10} mb={{ xs: 20, tablet: 0 }}>
              <Select
                control={control}
                placeholder="Time"
                name="startTime"
                data={timeOptions}
                fixedHelperText={false}
                label="Start Time"
                formControlProps={{
                  sx: styles.labelTime,
                }}
              />
              <Typography color="black" mt={{ xs: 14, tablet: 45 }}>
                ～
              </Typography>
              <Select
                control={control}
                placeholder="Time"
                name="endTime"
                label="End Time"
                data={timeOptions}
                fixedHelperText={false}
                formControlProps={{
                  sx: styles.labelTime,
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Select
              label="メニュー名"
              name="menuId"
              control={control}
              placeholder="選択してください"
              data={[]}
            />
          </Grid>
          <Grid item xs={12}>
            <FormCoupon control={control} />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="クーポン"
              name="couponId"
              control={control}
              placeholder="選択してください"
              data={[]}
            />
          </Grid>
        </Grid>
      </Box>
    </CommonSection>
  );
};

export default ReservationForm;
