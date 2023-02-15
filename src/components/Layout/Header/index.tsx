import LogoSvg from '@icons/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Stack } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Link from 'components/Link';
import useBreakpoint from 'hooks/useBreakpoint';
import useGlobalState from 'hooks/useGlobalState';
import dynamic from 'next/dynamic';
import React from 'react';

import styles from './styles';

const Navbar = dynamic(() => import('./Navbar'), { ssr: false });

interface HeaderProps {
  isCardLayout?: boolean;
}

export interface NavbarMenuItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ isCardLayout }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });
  const isBreakpoint = useBreakpoint({});
  const { setOpenDrawer } = useGlobalState();

  if (isCardLayout) {
    return (
      <AppBar
        component="header"
        color="transparent"
        sx={styles.cardLayoutHeader}
      >
        <Stack sx={styles.cardHeaderContent} direction="row">
          <Link href="/" sx={styles.logo}>
            <LogoSvg />
          </Link>
          {isBreakpoint ? (
            <IconButton
              aria-label="menu"
              sx={styles.hamburgerBtn}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Navbar isCardLayout />
          )}
        </Stack>
      </AppBar>
    );
  }

  return (
    <>
      {isBreakpoint && (
        <IconButton
          aria-label="menu"
          sx={{
            ...styles.hamburgerBtn,
            position: 'absolute',
            right: 20,
            top: 9,
            zIndex: 1,
          }}
          onClick={() => setOpenDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      )}
      <AppBar component="header" sx={styles.layoutHeader} data-scroll={trigger}>
        {isBreakpoint ? (
          <>
            <Link href="/" sx={styles.logo}>
              <LogoSvg />
            </Link>
            <IconButton
              aria-label="menu"
              sx={styles.hamburgerBtn}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </>
        ) : (
          <Navbar />
        )}
      </AppBar>
    </>
  );
};

export default Header;
