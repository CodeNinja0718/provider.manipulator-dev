import { Collapse, Stack } from '@mui/material';
import React from 'react';

import ReservationHeader from '../ReservationHeader';
import styles from './styles';

interface ReservationSectionProps {
  children: React.ReactNode;
  title: string;
  avatar: string;
}

const ReservationSection: React.FC<ReservationSectionProps> = ({
  children,
  title,
  avatar,
  ...props
}) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Stack
      component="section"
      alignItems="start"
      sx={styles.reservationSectionWrapper}
      {...props}
    >
      <ReservationHeader
        title={title}
        avatar={avatar}
        isOpen={open}
        onClick={handleClick}
      />
      <Collapse in={open} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
        {children}
      </Collapse>
    </Stack>
  );
};
export default ReservationSection;
