import ArrowRight from '@icons/arrow-right.svg';
import { Button, Stack, Typography } from '@mui/material';
import Link from 'components/Link';

import styles from './styles';

const MenuList = () => {
  return (
    <Stack alignItems="center" p={{ xs: '45px 0 60px', tablet: '60px 0 78px' }}>
      <Typography variant="title" mb={46}>
        整体師一覧
      </Typography>
      <Button
        component={Link}
        variant="contained"
        href="/my-page/manipulator/register"
        sx={styles.updateScheduleBtn}
        endIcon={<ArrowRight />}
      >
        整体師を登録する
      </Button>
    </Stack>
  );
};

export default MenuList;
