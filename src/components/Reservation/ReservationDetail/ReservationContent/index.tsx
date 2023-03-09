import { Box, Divider, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import React from 'react';

import ContentLine from './ContentLine';
import styles from './styles';

interface ReservationContentProps {}

const ReservationContent: React.FC<ReservationContentProps> = () => {
  return (
    <CommonSection title="予約内容">
      <Box sx={styles.contentWarpper}>
        <Stack spacing={20} divider={<Divider flexItem />}>
          <ContentLine start="予約日時" center="2022/11/14(月) 10:00～11:00" />
          <ContentLine start="整体師" center="整体師太郎" />
          <ContentLine
            start="予約メニュー"
            center="時間予約コース 60分"
            end={<Typography>6,000円</Typography>}
          />
          <ContentLine start="回数券利用" center="1回" />
          <ContentLine start="クーポン" center="-" />
          <ContentLine
            start="お支払い金額"
            end={
              <Typography fontWeight={600}>
                <Box display={'inline-block'} fontSize={26}>
                  6,000
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
