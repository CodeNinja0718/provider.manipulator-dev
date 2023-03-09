import { Box, SvgIcon, Typography } from '@mui/material';
import * as React from 'react';

import styles from './styles';

interface IconTextProps {
  label: string;
  icon?: any;
  bgColor: string;
}
const IconText = ({ label, icon, bgColor }: IconTextProps) => {
  return (
    <Box sx={styles.buttonIconText}>
      <Box component={'div'} sx={styles.buttonIcon} bgcolor={bgColor}>
        <Box width={20} height={18}>
          <SvgIcon
            component={icon}
            sx={{
              width: 'inherit',
              height: 'inherit',
            }}
            inheritViewBox
          />
        </Box>
      </Box>
      <Box component={'div'} sx={styles.buttonText}>
        <Typography component="p" fontWeight={400}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

export default IconText;
