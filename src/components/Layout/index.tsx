import { ArrowUpward } from '@mui/icons-material';
import { Box, Card, IconButton, Stack } from '@mui/material';
import { useScroll } from 'framer-motion';
import useUser from 'hooks/useUser';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { PROVIDER_NAVIGATION } from 'utils/const';

import Drawer from './CommonDrawer';
import Footer from './Footer';
import Header from './Header';
import SideMenu from './SideMenu';
import styles from './styles';

export default function Layout({
  children,
  isCardLayout = false,
  withSideMenu = false,
}: {
  children: ReactNode;
  isCardLayout?: boolean;
  withSideMenu?: boolean;
}) {
  const pageHeight =
    typeof document !== 'undefined' ? document.body.scrollHeight : 0;

  const [opacity, setOpacity] = useState(0);
  const { scrollY } = useScroll({
    offset: ['0px start', `${pageHeight - 67}px end`],
  });
  const { isOwner } = useUser();

  const menus = useMemo(() => {
    if (isOwner) return PROVIDER_NAVIGATION;
    return PROVIDER_NAVIGATION.filter((item) => !item.notAllowNormal);
  }, [isOwner]);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > document.documentElement.clientHeight) {
        setOpacity(1);
      } else setOpacity(0);
    });
  }, [scrollY]);

  const renderMainLayout = (content: ReactNode) => {
    if (isCardLayout && withSideMenu) {
      return (
        <Card sx={styles.cardLayout}>
          <Stack direction="row" sx={styles.sideMenuLayoutWrapper}>
            <SideMenu menus={menus} />
            {content}
          </Stack>
        </Card>
      );
    }
    if (isCardLayout) {
      return <Card sx={styles.cardLayout}>{content}</Card>;
    }
    return content;
  };

  return (
    <Box sx={styles.layoutContainer}>
      <Header isCardLayout={isCardLayout} />
      <Box component="main" sx={styles.mainContent} data-card={isCardLayout}>
        {renderMainLayout(children)}
      </Box>
      <Footer />
      <Drawer menus={menus} />
      <IconButton
        sx={[
          ...(Array.isArray(styles.fabButton)
            ? styles.fabButton
            : [styles.fabButton]),
          {
            opacity,
            pointerEvents: opacity === 1 ? 'normal' : 'none',
            transform: `scale(${opacity ? 1 : 0})`,
          },
        ]}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        <ArrowUpward />
      </IconButton>
    </Box>
  );
}
