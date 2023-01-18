import { Box, Container, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'components/Link';
import { useUser } from 'hooks';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import t from 'utils/translator';

import styles from './styles';

const customerMenus: any[] = [];
const SideMenuLayout = ({ children }: { children: ReactNode }) => {
  const { route } = useRouter();
  const { data } = useUser({ enabled: false });

  return (
    <Container maxWidth="lg" disableGutters sx={styles.container}>
      <Box display={{ sl: 'flex', xs: 'block' }} flexGrow={1}>
        <Box sx={styles.sideMenu}>
          <Box display="flex" alignItems="center" p={3}>
            <Box ml="12px">
              <Typography color="white">会員メニュー</Typography>
              <Typography className="line-clamp" sx={styles.userName}>
                {get(data, 'lastName')} {get(data, 'firstName')}
              </Typography>
            </Box>
          </Box>
          <List component="nav" aria-label="side-menu" sx={styles.listItem}>
            {customerMenus.map((menu) => (
              <Link href={menu.path} key={menu.path} sx={styles.link}>
                <ListItemButton
                  sx={styles.listItemButton}
                  selected={route.startsWith(menu.path)}
                >
                  {menu.icon} <ListItemText primary={t(menu.label)} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Box>
        <Box flex={1} overflow="hidden">
          {children}
        </Box>
      </Box>
    </Container>
  );
};

export default SideMenuLayout;
