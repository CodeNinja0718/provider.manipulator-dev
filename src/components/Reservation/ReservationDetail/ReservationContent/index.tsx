import { Box, Divider, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import dayjs from 'dayjs';
import type { ISalonInfo, ResultMenu } from 'models/reservation/interface';
import React from 'react';
import { DATE_FORMAT } from 'utils/const';

import ContentLine from './ContentLine';
import styles from './styles';

interface IReservationContent extends ResultMenu {
  startTime: string;
  endTime: string;
  salonInfo: ISalonInfo;
}

const ReservationContent: React.FC<IReservationContent> = ({
  menuInfo,
  startTime,
  endTime,
  salonInfo,
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
              .format('hh:mm')} ~ ${dayjs.utc(endTime).tz().format('hh:mm')}`}
          />
          <ContentLine start="整体師" center={salonInfo?.name} />
          <ContentLine
            start="予約メニュー"
            center={`時間予約コース ${menuInfo?.estimatedTime || 0}分`}
            end={<Typography>{`${menuInfo?.price || 0} 円`}</Typography>}
          />
          {/* Coupon */}
          {/* <ContentLine start="回数券利用" center="1回" /> */}
          {/* <ContentLine start="クーポン" center="-" /> */}
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
    </CommonSection>
  );
};
export default ReservationContent;
