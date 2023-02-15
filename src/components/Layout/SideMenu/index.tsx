import {
  Box,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { PROVIDER_NAVIGATION } from 'utils/const';

import styles from './styles';

const SideMenu: React.FC = () => {
  const router = useRouter();
  return (
    <Box sx={styles.sideMenuContainer}>
      <Box sx={styles.sideMenuWrapper}>
        <Typography sx={styles.title}>マイページ</Typography>
        <List
          component="nav"
          aria-label="side-menu"
          disablePadding
          sx={styles.menuList}
        >
          {PROVIDER_NAVIGATION.map((nav) => (
            <Link key={nav.href} href={nav.href}>
              <ListItemButton
                sx={styles.menuBtn}
                selected={router.pathname.startsWith(nav.href)}
              >
                <ListItemIcon>{nav.icon}</ListItemIcon>
                <ListItemText>{nav.label}</ListItemText>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SideMenu;
