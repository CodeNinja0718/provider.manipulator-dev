import { Box, Typography } from '@mui/material';

import type { HeadingProps } from './interface';
import styles from './styles';

const Heading = ({ value, customHeadingClass }: HeadingProps) => {
  return (
    <Box sx={styles.container} className={customHeadingClass}>
      <Typography variant="body1" sx={styles.text}>
        {value}
      </Typography>
    </Box>
  );
};

export default Heading;
