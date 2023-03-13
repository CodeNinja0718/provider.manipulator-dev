import { Box, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import dayjs from 'dayjs';
import type { ISalonInfo, ResultMenu } from 'models/reservation/interface';
import React from 'react';

import styles from './styles';

interface IReservationTreatment extends ResultMenu {
  startTime: string;
  endTime: string;
  salonInfo: ISalonInfo;
}

const ReservationTreatment: React.FC<IReservationTreatment> = ({
  menuInfo,
  startTime,
  endTime,
  salonInfo,
}) => {
  const valueDate =
    startTime || endTime ? dayjs(startTime || endTime) : dayjs();

  return (
    <CommonSection title="施術内容">
      <Box sx={styles.contentWarpper}>
        <Typography fontSize={14}>
          ※この項目は、施術完了後に入力してください。
        </Typography>
      </Box>
    </CommonSection>
  );
};
export default ReservationTreatment;
