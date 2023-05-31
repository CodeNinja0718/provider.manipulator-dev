import { Box, Divider, Stack, Typography } from '@mui/material';
import ContentLine from 'components/Reservation/ReservationDetail/ReservationContent/ContentLine';
import type { TreatmentFormValues } from 'components/Reservation/ReservationTreatment/models/schema';
import type { ICoupon, ICouponTicket } from 'models/tickets/interface';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import Helper from 'utils/helpers';

import styles from './styles';

interface IPaymentFee {
  initialTreatmentValues: TreatmentFormValues;
  couponData?: Partial<ICoupon>;
  ticketData?: Partial<ICouponTicket>;
}

const PaymentFee: React.FC<IPaymentFee> = ({
  initialTreatmentValues,
  couponData,
  ticketData,
}) => {
  return (
    <Box sx={styles.feeWrapper}>
      <Typography sx={styles.label}>お支払い料金</Typography>
      <Stack spacing={20} divider={<Divider flexItem />}>
        {/* Ticket, Coupon */}
        {!!ticketData && <ContentLine start="回数券" end="1回使用" />}
        {!!couponData && (
          <ContentLine
            start="クーポン"
            center={
              <Typography fontWeight={'bold'}>{couponData.title}</Typography>
            }
            end={
              <Typography color="#d82c2c">{`- ${Helper.addComma(
                couponData.amount || 0,
              )}円`}</Typography>
            }
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
              value={
                initialTreatmentValues.priceType === 'ticket'
                  ? 0
                  : (initialTreatmentValues?.price || 0) -
                    (couponData?.amount || 0)
              }
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
