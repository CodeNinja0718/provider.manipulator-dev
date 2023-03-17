import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import NumberField from 'components/Form/NumberField';
import React from 'react';
import type { Control } from 'react-hook-form';

import type { RegistrationFormValues } from './models/schema';
import styles from './styles';

interface IFormCoupon {
  control: Control<RegistrationFormValues>;
}

const FormCoupon: React.FC<IFormCoupon> = ({ control }) => {
  return (
    <Box sx={styles.couponWrapper}>
      <Box sx={styles.couponHeader}>
        <Typography sx={styles.labelStyle}>
          整体10回コース（目安時間：30分）
        </Typography>
      </Box>
      <Box p="7px 20px">
        <Typography fontWeight={300} fontSize={14}>
          有効期限：2022/12/31
        </Typography>
      </Box>
      <Divider />
      <Box p={'20px 20px 0px 20px'}>
        <Grid container spacing={2}>
          <Grid item xs={'auto'}>
            <Box sx={styles.couponLabel}>
              <Typography sx={styles.labelStyle}>
                残り
                <Box fontSize={18} component="label">
                  10
                </Box>
                回
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={true}>
            <Stack direction={'row'} spacing={8} justifyContent="right">
              <Typography sx={styles.labelStyleSpec}>使用する</Typography>
              <Box width={90}>
                <NumberField
                  name="quantity"
                  control={control}
                  placeholder=""
                  sx={styles.numberField}
                  unitLabel={<Typography sx={styles.labelStyle}>回</Typography>}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default FormCoupon;
