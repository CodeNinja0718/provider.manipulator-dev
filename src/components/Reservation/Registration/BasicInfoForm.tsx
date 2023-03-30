import { Box, Grid } from '@mui/material';
import Select from 'components/Form/Select';
import TextField from 'components/Form/TextField';
import React from 'react';
import type { Control } from 'react-hook-form';

import type { RegistrationFormValues } from './models/schema';
import styles from './styles';

interface IBasicInfoForm {
  control: Control<RegistrationFormValues>;
  salonList: { id: string | number; name: string | number }[];
}

const BasicInfoForm: React.FC<IBasicInfoForm> = ({ control, salonList }) => {
  return (
    <Box sx={styles.wrapper}>
      <Grid container spacing={{ xs: 0, tablet: 20 }}>
        <Grid item xs={12} tablet={6}>
          <Select
            label="整体師"
            name="manipulatorId"
            control={control}
            placeholder="選択してください"
            data={salonList}
            required
          />
        </Grid>
        <Grid item xs={12} tablet={6}>
          <TextField
            label="お客様名"
            name="customerName"
            control={control}
            placeholder="お客様名"
          />
        </Grid>
      </Grid>
      {/* <Stack spacing={6}>
        <Typography fontWeight={500} fontSize={18}>
          山田 花子
        </Typography>
        <Typography fontSize={14}>前回来院日: 2022/11/20</Typography>
      </Stack> */}
    </Box>
  );
};
export default BasicInfoForm;
