import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import styles from './styles';

interface CollapseHeaderProps {
  title: string;
  isOpen: boolean;
  onClick: () => void;
}

const CollapseHeader: React.FC<CollapseHeaderProps> = ({
  title,
  isOpen,
  onClick,
}) => {
  return (
    <Grid container onClick={onClick} sx={styles.collapseHeaderWrapper}>
      <Grid item xs>
        <Stack direction={'row'} spacing={12} alignItems="center">
          <Typography fontSize={20} fontWeight={600}>
            {title}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs="auto" border="1px solid" px={7} py={8}>
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
export default CollapseHeader;
