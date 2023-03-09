import ArrowIcon from '@icons/arrow.svg';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';

import styles from './styles';

interface BackButtonProps {
  isHideArrow?: boolean;
}
const BackButton = ({ isHideArrow, ...props }: BackButtonProps) => {
  const router = useRouter();
  return (
    <Stack
      spacing={6}
      direction="row"
      sx={styles.linkStyle}
      onClick={() => router.back()}
    >
      {!isHideArrow && (
        <SvgIcon component={ArrowIcon} viewBox="0 0 14 30" color="inherit" />
      )}
      <Typography
        component="p"
        fontSize="12px"
        color="graySolid"
        marginBottom={5}
        {...props}
      >
        前のページへ戻る
      </Typography>
    </Stack>
  );
};

export default BackButton;
