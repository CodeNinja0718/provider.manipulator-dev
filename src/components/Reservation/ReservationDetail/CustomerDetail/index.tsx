import { Box, Grid, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import type { ICustomerInfo } from 'models/reservation/interface';
import React from 'react';

import styles from './styles';

const CustomerDetail: React.FC<ICustomerInfo> = ({ name, nameKana, phone }) => {
  return (
    <CommonSection title="顧客詳細">
      <Box sx={styles.detailWarpper}>
        <Grid container>
          <Grid item xs={8} tablet={6}>
            <Stack spacing={6}>
              <Typography fontSize={18} fontWeight={500}>
                {name}
              </Typography>
              <Typography fontSize={14} fontWeight={500}>
                {nameKana}
              </Typography>
            </Stack>
            <Stack spacing={10} direction="row" mt={20}>
              <Typography fontSize={16} fontWeight={500} color="secondary">
                電話番号
              </Typography>
              <Typography fontSize={16}>{phone}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </CommonSection>
  );
};
export default CustomerDetail;
