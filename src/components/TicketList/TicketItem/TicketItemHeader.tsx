import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Grid, Stack, Typography } from '@mui/material';

import styles from './styles';

interface TicketItemHeaderProps {
  title: string;
  isOpen: boolean;
  onClick: () => void;
}

const TicketItemHeader = ({
  title,
  isOpen,
  onClick,
}: TicketItemHeaderProps) => (
  <Grid container onClick={onClick} sx={styles.headerWrapper}>
    <Grid item xs>
      <Stack direction={'row'} spacing={12} alignItems="center">
        <Typography fontSize={18} fontWeight={600}>
          {title}
        </Typography>
      </Stack>
    </Grid>
    <Grid item xs="auto">
      <Stack direction={'row'} spacing={4} alignItems="center">
        <ArrowDropUpIcon
          sx={{
            ...styles.arrow,
            transform: `rotate(${isOpen ? 0 : 180}deg)`,
          }}
        />
        <Typography fontSize={14} fontWeight={600}>
          {isOpen ? '閉じる' : '開ける'}
        </Typography>
      </Stack>
    </Grid>
  </Grid>
);

export default TicketItemHeader;
