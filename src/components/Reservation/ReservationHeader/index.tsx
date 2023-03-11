import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Avatar, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import styles from './styles';

interface ReservationHeaderProps {
  title: string;
  avatar?: string;
  isOpen: boolean;
  onClick: () => void;
}

const ReservationHeader: React.FC<ReservationHeaderProps> = ({
  title,
  avatar,
  isOpen,
  onClick,
}) => {
  return (
    <Grid container onClick={onClick} sx={styles.reservationHeaderWrapper}>
      <Grid item xs>
        <Stack direction={'row'} spacing={12} alignItems="center">
          <Avatar alt="" src={avatar} sx={styles.avatar} />
          <Typography fontSize={18} fontWeight={600}>
            {title}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs="auto">
        <Stack direction={'row'} spacing={4} alignItems="center">
          {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          <Typography fontSize={14} fontWeight={600}>
            {isOpen ? '閉じる' : '開ける'}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
export default ReservationHeader;
