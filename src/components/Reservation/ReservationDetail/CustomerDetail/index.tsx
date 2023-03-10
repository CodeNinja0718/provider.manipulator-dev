import { Box, Grid, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import React from 'react';

import styles from './styles';

interface CustomerDetailProps {}

const CustomerDetail: React.FC<CustomerDetailProps> = () => {
  return (
    <CommonSection title="顧客詳細">
      <Box sx={styles.detailWarpper}>
        <Grid container>
          <Grid item xs={8} tablet={6}>
            <Stack spacing={6}>
              <Typography fontSize={18} fontWeight={500}>
                山田 花子
              </Typography>
              <Typography fontSize={14} fontWeight={500}>
                やまだ はなこ
              </Typography>
            </Stack>
            <Stack spacing={10} direction="row" mt={20}>
              <Typography fontSize={16} fontWeight={500} color="secondary">
                電話番号
              </Typography>
              <Typography fontSize={16}>09012345678</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </CommonSection>
  );
};
export default CustomerDetail;
