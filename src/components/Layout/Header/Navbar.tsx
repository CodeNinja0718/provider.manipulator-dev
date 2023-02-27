import HomeSvg from '@icons/icon_home.svg';
import LoginSvg from '@icons/icon_login.svg';
import LogoutSvg from '@icons/icon_logout.svg';
import RegisterSvg from '@icons/icon_profile.svg';
import { Stack, SvgIcon, Typography } from '@mui/material';
import Link from 'components/Link';
import useLogout from 'models/auth/useLogout';
import { useRouter } from 'next/router';
import React from 'react';
import Helper from 'utils/helpers';

import styles from './styles';

interface NavbarProps {
  isCardLayout?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isCardLayout }) => {
  const { logout } = useLogout();
  const webCookie = Helper.getWebCookie();
  const router = useRouter();

  const token = webCookie?.accessToken;

  const renderNavigationLink = (): React.ReactNode => {
    if (token) {
      if (router.pathname === '/complete-profile') {
        return (
          <Typography
            sx={styles.navBarMenuItem}
            data-card={isCardLayout}
            onClick={logout}
          >
            <SvgIcon component={LogoutSvg} inheritViewBox />
            ログアウト
          </Typography>
        );
      }
      return (
        <>
          <Link
            href="/my-page/profile"
            sx={styles.navBarMenuItem}
            data-card={isCardLayout}
          >
            <SvgIcon component={RegisterSvg} inheritViewBox />
            マイページ
          </Link>
          <Typography
            sx={styles.navBarMenuItem}
            data-card={isCardLayout}
            onClick={logout}
          >
            <SvgIcon component={LogoutSvg} inheritViewBox />
            ログアウト
          </Typography>
        </>
      );
    }
    return (
      <>
        {router.pathname !== '/register' && (
          <Link
            href="/register"
            sx={styles.navBarMenuItem}
            data-card={isCardLayout}
          >
            <SvgIcon component={RegisterSvg} inheritViewBox />
            新規会員登録
          </Link>
        )}
        {router.pathname !== '/login' && (
          <Link
            href="/login"
            sx={styles.navBarMenuItem}
            data-card={isCardLayout}
          >
            <SvgIcon component={LoginSvg} inheritViewBox />
            ログイン
          </Link>
        )}
      </>
    );
  };

  return (
    <Stack direction="row" sx={styles.navBarMenus}>
      <Link href="/" sx={styles.navBarMenuItem} data-card={isCardLayout}>
        <SvgIcon component={HomeSvg} inheritViewBox />
        ホーム
      </Link>
      {renderNavigationLink()}
    </Stack>
  );
};

export default Navbar;
