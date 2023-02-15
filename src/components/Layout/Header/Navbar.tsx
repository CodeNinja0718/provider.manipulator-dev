import HomeSvg from '@icons/icon_home.svg';
import LoginSvg from '@icons/icon_login.svg';
import LogoutSvg from '@icons/icon_logout.svg';
import RegisterSvg from '@icons/icon_profile.svg';
import { Stack, SvgIcon, Typography } from '@mui/material';
import Link from 'components/Link';
import useLogout from 'models/auth/useLogout';
import React from 'react';
import Helper from 'utils/helpers';

import styles from './styles';

interface NavbarProps {
  isCardLayout?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isCardLayout }) => {
  const { logout } = useLogout();
  const webCookie = Helper.getWebCookie();

  const token = webCookie?.accessToken;

  return (
    <Stack direction="row" sx={styles.navBarMenus}>
      <Link href="/" sx={styles.navBarMenuItem} data-card={isCardLayout}>
        <SvgIcon component={HomeSvg} inheritViewBox />
        ホーム
      </Link>
      {token ? (
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
      ) : (
        <>
          <Link
            href="/register"
            sx={styles.navBarMenuItem}
            data-card={isCardLayout}
          >
            <SvgIcon component={RegisterSvg} inheritViewBox />
            {isCardLayout ? (
              <>
                初めてのご利用の方へ
                <br />
                新規会員登録
              </>
            ) : (
              '新規会員登録'
            )}
          </Link>
          <Link
            href="/login"
            sx={styles.navBarMenuItem}
            data-card={isCardLayout}
          >
            <SvgIcon component={LoginSvg} inheritViewBox />
            ログイン
          </Link>
        </>
      )}
    </Stack>
  );
};

export default Navbar;
