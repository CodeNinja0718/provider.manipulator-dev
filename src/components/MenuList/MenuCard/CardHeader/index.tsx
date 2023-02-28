import { Box, Typography } from '@mui/material';

import styles from '../styles';

interface CardHeaderProps {
  title: string;
  isUnpublished?: boolean;
}
const CardHeader = ({ title, isUnpublished }: CardHeaderProps) => {
  return (
    <Box
      sx={{
        ...styles.menuCardHeader,
        ...{ bgcolor: isUnpublished ? 'placeholder' : 'secondary.main' },
      }}
    >
      <Typography component={'h3'}>{title}</Typography>
    </Box>
  );
};
export default CardHeader;
