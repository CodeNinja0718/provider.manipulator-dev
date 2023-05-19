import { Box, Divider, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import ContentLine from 'components/Reservation/ReservationDetail/ReservationContent/ContentLine';
import type { TreatmentFormValues } from 'components/Reservation/ReservationTreatment/models/schema';
import dayjs from 'dayjs';
import type { IMenu } from 'models/menu/interface';
import type { ISalonInfo, ResultMenu } from 'models/reservation/interface';
import type { ICoupon, ICouponTicket } from 'models/tickets/interface';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import { DATE_FORMAT } from 'utils/const';

import PaymentFee from '../PaymentFee';
import TreatmentDetail from '../TreatmentDetail';
import styles from './styles';

interface IPaymentDetail extends ResultMenu {
  startTime: string;
  endTime: string;
  salonInfo: ISalonInfo;
  initialTreatmentValues: TreatmentFormValues;
  menuUpdatingInfo: IMenu;
  couponData?: ICoupon;
  ticketData?: ICouponTicket;
}

const PaymentDetail: React.FC<IPaymentDetail> = ({
  startTime,
  endTime,
  salonInfo,
  initialTreatmentValues,
  menuUpdatingInfo,
  couponData,
}) => {
  const handleGetDate = () => {
    const valueDate =
      startTime || endTime ? dayjs(startTime || endTime) : dayjs();
    return valueDate.format(DATE_FORMAT);
  };

  const handleGetEndTime = () => {
    const endTimeMili = (menuUpdatingInfo?.estimatedTime || 1) * 60000;
    const newEndTime = dayjs.utc(startTime).valueOf() + endTimeMili;

    return newEndTime;
  };

  return (
    <CommonSection title="予約内容">
      <Box sx={styles.contentWarpper}>
        <Stack spacing={20} divider={<Divider flexItem />}>
          <ContentLine start="整体師" center={salonInfo?.name} />
          <ContentLine
            start="ご予約日"
            center={`${handleGetDate()}(月) ${dayjs
              .utc(startTime)
              .tz()
              .format('HH:mm')} ~ ${dayjs
              .utc(handleGetEndTime())
              .tz()
              .format('HH:mm')}`}
          />
          <ContentLine
            start="予約コース"
            center={`${menuUpdatingInfo?.name} ${
              menuUpdatingInfo?.estimatedTime || 0
            }分`}
            end={
              <NumericFormat
                value={
                  (initialTreatmentValues.priceType === 'ticket'
                    ? menuUpdatingInfo.ticket?.price
                    : initialTreatmentValues?.price) || 0
                }
                thousandSeparator=","
                suffix="円"
                displayType="text"
                renderText={(value) => (
                  <Typography color="black">{value}</Typography>
                )}
              />
            }
          />
          <TreatmentDetail initialTreatmentValues={initialTreatmentValues} />
        </Stack>
        <PaymentFee
          initialTreatmentValues={initialTreatmentValues}
          couponData={couponData}
          ticketData={
            initialTreatmentValues.priceType === 'ticket'
              ? { price: menuUpdatingInfo.ticket.price }
              : undefined
          }
        />
      </Box>
    </CommonSection>
  );
};
export default PaymentDetail;
