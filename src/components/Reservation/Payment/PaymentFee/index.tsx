import { Box, Divider, Stack, Typography } from '@mui/material';
import ContentLine from 'components/Reservation/ReservationDetail/ReservationContent/ContentLine';
import type { TreatmentFormValues } from 'components/Reservation/ReservationTreatment/models/schema';
import React from 'react';
import { NumericFormat } from 'react-number-format';

import styles from './styles';

interface IPaymentFee {
  initialTreatmentValues: TreatmentFormValues;
}

const PaymentFee: React.FC<IPaymentFee> = ({ initialTreatmentValues }) => {
  return (
    <Box sx={styles.feeWrapper}>
      <Typography sx={styles.label}>お支払い料金</Typography>
      <Stack spacing={20} divider={<Divider flexItem />}>
        {/* Ticket, Coupon */}
        {initialTreatmentValues.isTicketUsed && (
          <ContentLine start="回数券" end="1回使用" />
        )}
        {!!initialTreatmentValues.couponCode && (
          <ContentLine
            start="クーポン"
            center={
              <Typography fontWeight={'bold'}>
                期間限定 1,000円クーポン
              </Typography>
            }
            end={<Typography color="#d82c2c">- 1,000円</Typography>}
            isAlignRightCenter
          />
        )}
        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography fontWeight={'bold'}>お支払い金額</Typography>
          <Box display={'inline-block'}>
            <NumericFormat
              value={initialTreatmentValues?.price || 0}
              thousandSeparator=","
              suffix="円"
              displayType="text"
              renderText={(value) => {
                return (
                  <Typography fontWeight={'bold'} fontSize={26}>
                    {value}
                  </Typography>
                );
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
export default PaymentFee;
