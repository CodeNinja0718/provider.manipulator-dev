import { Box, Divider, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import dayjs from 'dayjs';
import type { ISalonInfo, ResultMenu } from 'models/reservation/interface';
import type { ICoupon } from 'models/tickets/interface';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import { DATE_FORMAT } from 'utils/const';

import ContentLine from './ContentLine';
import styles from './styles';

interface IReservationContent extends ResultMenu {
  startTime: string;
  endTime: string;
  salonInfo: ISalonInfo;
  ticketUsed?: number;
  couponInfo?: ICoupon;
}

const ReservationContent: React.FC<IReservationContent> = ({
  menuInfo,
  startTime,
  endTime,
  salonInfo,
  ticketUsed,
  couponInfo,
  originalPrice,
  finalPrice,
}) => {
  const valueDate =
    startTime || endTime ? dayjs(startTime || endTime) : dayjs();

  return (
    <CommonSection title="予約内容">
      <Box sx={styles.contentWarpper}>
        <Stack spacing={20} divider={<Divider flexItem />}>
          <ContentLine
            start="予約日時"
            center={`${valueDate.format(DATE_FORMAT)}(月) ${dayjs
              .utc(startTime)
              .tz()
              .format('HH:mm')} ~ ${dayjs.utc(endTime).tz().format('HH:mm')}`}
          />
          <ContentLine start="整体師" center={salonInfo?.name} />
          <ContentLine
            start="予約メニュー"
            center={`${menuInfo?.name} ${menuInfo?.estimatedTime || 0}分`}
            end={
              <Typography>
                <NumericFormat
                  value={originalPrice || 0}
                  thousandSeparator=","
                  suffix="円"
                  displayType="text"
                  renderText={(value) => {
                    return value;
                  }}
                />
              </Typography>
            }
          />
          {/* Coupon */}
          {!!ticketUsed && (
            <ContentLine
              start="回数券利用"
              center={`${ticketUsed.toString()}回`}
            />
          )}
          {!!couponInfo && (
            <ContentLine
              start="クーポン"
              center={couponInfo.title}
              end={
                <Typography color={'red'}>
                  <NumericFormat
                    value={couponInfo.amount || 0}
                    thousandSeparator=","
                    suffix="円"
                    displayType="text"
                    renderText={(value) => {
                      return `- ${value}`;
                    }}
                  />
                </Typography>
              }
            />
          )}

          <ContentLine
            start="お支払い金額"
            end={
              <Typography fontWeight={600}>
                <Box
                  display={'inline-block'}
                  whiteSpace={'nowrap'}
                  fontSize={26}
                >
                  <NumericFormat
                    value={finalPrice || 0}
                    thousandSeparator=","
                    suffix="円"
                    displayType="text"
                    renderText={(value) => {
                      return value;
                    }}
                  />
                </Box>
              </Typography>
            }
          />
        </Stack>
      </Box>
    </CommonSection>
  );
};
export default ReservationContent;
