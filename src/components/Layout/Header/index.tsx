import { Box, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Link from 'next/link';
import * as React from 'react';

import Navbar from './Navbar';
import styles from './styles';

const Header = () => {
  return (
    <AppBar
      component="nav"
      position="sticky"
      color="secondary"
      sx={styles.appBar}
    >
      <Box display="flex" justifyContent="space-between">
        <Stack direction="row" gap={{ xs: 1, tablet: 2 }} alignItems="center">
          <Box sx={styles.logoContainer} component={Link} href="/"></Box>
        </Stack>
        <Navbar />
      </Box>
      <Navbar />
    </AppBar>
  );
};

export default Header;
