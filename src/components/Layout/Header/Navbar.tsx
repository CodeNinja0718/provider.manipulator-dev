/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable unused-imports/no-unused-vars */
import { Box, Drawer, Stack, Typography } from '@mui/material';
import { useUser } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import SidebarMobile from './SidebarMobile';
import styles from './styles';

const navbar: any[] = [];

const Navbar = ({ isMobile = false }: { isMobile?: boolean }) => {
  useUser({ enabled: false });
  const { pathname } = useRouter();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const handleCloseSidebar = () => {
    setIsOpenSidebar(false);
  };

  return (
    <Box display="flex">
      <Stack
        direction="row"
        spacing="38px"
        flex={1}
        sx={
          isMobile ? styles.navbarMobileContainer : styles.navbarTabletContainer
        }
      >
        {navbar.map((section) =>
          pathname === '/' ? (
            <>
              {section?.isDirectLink ? (
                <Link
                  key={section.href}
                  href={section.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography
                    fontWeight={500}
                    color="#443b38"
                    sx={styles.navbarItem}
                  >
                    {section.label}
                  </Typography>
                </Link>
              ) : (
                <ScrollLink
                  to={section.href}
                  smooth
                  offset={-96}
                  key={section.href}
                >
                  <Typography
                    fontWeight={500}
                    color="#443b38"
                    sx={styles.navbarItem}
                  >
                    {section.label}
                  </Typography>
                </ScrollLink>
              )}
            </>
          ) : (
            <>
              {section?.isDirectLink ? (
                <Link
                  key={section.href}
                  href={section.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography
                    fontWeight={500}
                    color="#443b38"
                    sx={styles.navbarItem}
                  >
                    {section.label}
                  </Typography>
                </Link>
              ) : (
                <Link key={section.href} href={`/#${section.href}`}>
                  <Typography
                    fontWeight={500}
                    color="#443b38"
                    sx={styles.navbarItem}
                  >
                    {section.label}
                  </Typography>
                </Link>
              )}
            </>
          ),
        )}
      </Stack>
      <Drawer
        anchor="right"
        open={isOpenSidebar}
        onClose={() => setIsOpenSidebar(false)}
        sx={{
          display: { sl: 'none', xs: 'block' },
        }}
      >
        <SidebarMobile onCloseSidebar={handleCloseSidebar} />
      </Drawer>
    </Box>
  );
};

export default Navbar;
