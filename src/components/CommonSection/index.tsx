import { Stack, Typography } from '@mui/material';
import React from 'react';

import styles from './styles';

interface CommonSectionProps {
  children: React.ReactNode;
  title: string;
  customHeadingClass?: string;
}

const CommonSection: React.FC<CommonSectionProps> = ({
  children,
  title,
  customHeadingClass,
  ...props
}) => {
  return (
    <Stack
      component="section"
      alignItems="start"
      sx={styles.commonSectionWrapper}
      {...props}
    >
      <Typography variant="section" className={customHeadingClass}>
        {title}
      </Typography>
      {children}
    </Stack>
  );
};
export default CommonSection;
