import CloseIcon from '@icons/close.svg';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useUser } from 'hooks';
import { get } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import t from 'utils/translator';

import styles from './styles';

const customerMenus: any[] = [];

const SidebarMobile = ({ onCloseSidebar }: { onCloseSidebar: () => void }) => {
  const { route } = useRouter();
  const { data } = useUser({ enabled: false });

  return (
    <Box sx={{ width: { xs: '320px', fcol: '325px' } }} role="presentation">
      <Box sx={styles.sideMenu}>
        <Box sx={{ pt: 3 }}>
          <Box sx={styles.closeButton} onClick={onCloseSidebar}>
            <CloseIcon sx={{ fontSize: 44 }} color="white" />
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            px: 3.75,
            pt: 3.2,
            pb: 5,
          }}
        >
          <Box ml="12px">
            <Typography color="white" fontSize={19}>
              会員メニュー
            </Typography>
            <Typography className="line-clamp" sx={styles.userName}>
              {get(data, 'lastName')} {get(data, 'firstName')}
            </Typography>
          </Box>
        </Box>
        <List component="nav" aria-label="side-menu" sx={styles.listSidebar}>
          {customerMenus.map((menu) => (
            <Link href={menu.path} key={menu.path} onClick={onCloseSidebar}>
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
    </Box>
  );
};

export default SidebarMobile;
