import { Stack, Typography } from '@mui/material';
import React from 'react';

import styles from './styles';

interface CommonSectionProps {
  children: React.ReactNode;
  title: string;
}

const CommonSection: React.FC<CommonSectionProps> = ({
  children,
  title,
  ...props
}) => {
  return (
    <Stack
      component="section"
      alignItems="start"
      sx={styles.commonSectionWrapper}
      {...props}
    >
      <Typography variant="section" sx={styles.sectionTitle}>
        {title}
      </Typography>
      {children}
    </Stack>
  );
};
export default CommonSection;
