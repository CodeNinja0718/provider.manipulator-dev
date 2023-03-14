import { Box, Divider, Stack, Typography } from '@mui/material';
import ContentLine from 'components/Reservation/ReservationDetail/ReservationContent/ContentLine';
import type { IMenuItem } from 'models/reservation/interface';
import React from 'react';

import styles from './styles';

interface IPaymentFee {
  menuInfo: IMenuItem;
}

const PaymentFee: React.FC<IPaymentFee> = ({ menuInfo }) => {
  return (
    <Box sx={styles.feeWrapper}>
      <Typography sx={styles.label}>お支払い料金</Typography>
      <Stack spacing={20} divider={<Divider flexItem />}>
        {/* Ticket */}
        <ContentLine start="回数券" end="1回使用" />
        <ContentLine
          start="クーポン"
          center="期間限定 1,000円クーポン"
          end={<Typography color="#d82c2c">- 1,000円</Typography>}
          isAlignRightCenter
        />
        <ContentLine
          start="お支払い金額"
          end={
            <Typography fontWeight={600}>
              <Box display={'inline-block'} fontSize={26}>
                {menuInfo?.price || 0}
              </Box>
              円
            </Typography>
          }
        />
      </Stack>
    </Box>
  );
};
export default PaymentFee;
