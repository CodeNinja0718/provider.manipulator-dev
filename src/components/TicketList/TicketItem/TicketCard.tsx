import { Box, Divider, Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { ICouponTicket } from 'models/tickets/interface';
import { DateFormat } from 'utils/const';

import styles from './styles';

interface TicketCardProps {
  data: ICouponTicket;
  hasDivider: boolean;
}

const TicketCard = ({ data, hasDivider }: TicketCardProps) => {
  const expiredDate = dayjs(data.expiredAt);
  const dayDiff = expiredDate.diff(Date.now(), 'd');

  const isWarning = dayDiff <= 1;

  return (
    <Box sx={styles.ticketCardContainer}>
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{ py: 20 }}
      >
        <Box>
          <Typography fontSize={18} fontWeight={'bold'}>
            {data.name}
          </Typography>
          <Typography
            fontSize={14}
            sx={{ pt: 8 }}
            color={isWarning ? '#D82C2C' : undefined}
          >
            {`有効期限: ${expiredDate.format(DateFormat.YEAR_MONTH_DATE)}`}
          </Typography>
        </Box>
        <Box sx={styles.remaining}>
          <Typography
            fontSize={16}
            fontWeight={'bold'}
            color={'spanishOrange'}
          >{`残り ${data.availableCount} 回`}</Typography>
        </Box>
      </Box>
      {hasDivider && <Divider />}
    </Box>
  );
};

export default TicketCard;
