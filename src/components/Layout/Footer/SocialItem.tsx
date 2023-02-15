import FacebookIcon from '@icons/facebook_icon.svg';
import InstagramIcon from '@icons/instagram_icon.svg';
import TwitterIcon from '@icons/twitter_icon.svg';
import type { SxProps, Theme } from '@mui/material';
import { Link, Stack } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

const socialItems = [
  {
    href: 'instagram',
    icon: InstagramIcon,
  },
  {
    href: 'twitter',
    icon: TwitterIcon,
  },
  {
    href: 'facebook',
    icon: FacebookIcon,
  },
];

interface SocialItemProps {
  style?: SxProps<Theme> | undefined;
}

const SocialItem = ({ style }: SocialItemProps) => {
  return (
    <Stack direction="row" flexWrap="wrap" gap={20} sx={style}>
      {socialItems.map((item) => (
        <Link key={item.href} href={`/${item.href}`} sx={{ height: 16.6 }}>
          <SvgIcon component={item.icon} sx={{ color: 'white' }} />
        </Link>
      ))}
    </Stack>
  );
};

export default SocialItem;
