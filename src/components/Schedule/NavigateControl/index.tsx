import ArrowLeft from '@icons/arrow-left.svg';
import ArrowRight from '@icons/arrow-right.svg';
import { Stack } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import Link from 'components/Link';
import type { LinkProps } from 'next/link';

import styles from './styles';

interface NavigateControlProps {
  children?: React.ReactNode;
  previousHref: LinkProps['href'];
  previousText?: string;
  previousDisabled?: boolean;
  nextHref: LinkProps['href'];
  nextText?: string;
  nextDisabled?: boolean;
  sx?: SxProps<Theme>;
}

const NavigateControl: React.FC<NavigateControlProps> = ({
  children,
  previousHref,
  previousText = '前日',
  previousDisabled = false,
  nextHref,
  nextText = '翌日',
  nextDisabled = false,
  ...props
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={styles.navigateControlWrapper}
      {...props}
    >
      <Link
        href={previousHref}
        sx={styles.navLink}
        data-disabled={previousDisabled}
        shallow
      >
        <ArrowLeft />
        {previousText}
      </Link>
      {children}
      <Link
        href={nextHref}
        sx={styles.navLink}
        data-disabled={nextDisabled}
        shallow
      >
        {nextText}
        <ArrowRight />
      </Link>
    </Stack>
  );
};

export default NavigateControl;
