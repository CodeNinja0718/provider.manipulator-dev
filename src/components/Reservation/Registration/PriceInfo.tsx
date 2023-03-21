import { Box, Divider, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import React from 'react';

import ContentLine from '../ReservationDetail/ReservationContent/ContentLine';
import styles from './styles';

interface IPriceInfo {}

const PriceInfo: React.FC<IPriceInfo> = () => {
  return (
    <CommonSection title="料金">
      <Box pt={20} sx={styles.wrapper}>
        <Stack spacing={20} divider={<Divider flexItem />}>
          <ContentLine start="初診コース 60分" end="6,000円" />
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
                <Box display={'inline-block'} fontSize={26} component="span">
                  5000
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
export default PriceInfo;
