import { Box, Divider, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import ContentLine from 'components/Reservation/ReservationDetail/ReservationContent/ContentLine';
import dayjs from 'dayjs';
import type { ISalonInfo, ResultMenu } from 'models/reservation/interface';
import React from 'react';
import { DATE_FORMAT } from 'utils/const';

import PaymentFee from '../PaymentFee';
import TreatmentDetail from '../TreatmentDetail';
import styles from './styles';

interface IPaymentDetail extends ResultMenu {
  startTime: string;
  endTime: string;
  salonInfo: ISalonInfo;
}

const PaymentDetail: React.FC<IPaymentDetail> = ({
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
          <ContentLine start="整体師" center={salonInfo?.name} />
          <ContentLine
            start="ご予約日"
            center={`${valueDate.format(DATE_FORMAT)}(月) ${dayjs
              .utc(startTime)
              .tz()
              .format('hh:mm')} ~ ${dayjs.utc(endTime).tz().format('hh:mm')}`}
          />
          <ContentLine
            start="予約コース"
            center={`時間予約コース ${menuInfo?.estimatedTime || 0}分`}
            end={<Typography>{`${menuInfo?.price || 0} 円`}</Typography>}
          />
        </Stack>
        <TreatmentDetail />
        <PaymentFee menuInfo={menuInfo} />
      </Box>
    </CommonSection>
  );
};
export default PaymentDetail;
