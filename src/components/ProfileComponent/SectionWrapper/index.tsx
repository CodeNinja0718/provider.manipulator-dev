import { Box } from '@mui/material';
import Heading from 'components/Heading';
import React from 'react';

import styles from './styles';

interface SectionWrapperProps {
  children: React.ReactNode;
  title: string;
}

const SectionWrapper = ({ children, title }: SectionWrapperProps) => {
  return (
    <Box>
      <Heading value={title} />
      <Box sx={styles.wrapper}>{children}</Box>
    </Box>
  );
};
export default SectionWrapper;
