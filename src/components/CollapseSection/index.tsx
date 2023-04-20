import { Collapse, Stack } from '@mui/material';
import CollapseHeader from 'components/CollapseHeader';
import React from 'react';

import styles from './styles';

interface CollapseSectionProps {
  children: React.ReactNode;
  title: string;
}

const CollapseSection: React.FC<CollapseSectionProps> = ({
  children,
  title,
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
      sx={styles.collapseSectionWrapper}
      {...props}
    >
      <CollapseHeader title={title} isOpen={open} onClick={handleClick} />
      <Collapse in={open} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
        {children}
      </Collapse>
    </Stack>
  );
};
export default CollapseSection;
