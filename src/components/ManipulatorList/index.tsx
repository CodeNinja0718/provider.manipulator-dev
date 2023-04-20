import ArrowRight from '@icons/arrow-right.svg';
import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'components/Link';

import ManipulatorCard from './ManipulatorCard';
import styles from './styles';

const ManipulatorList = () => {
  return (
    <Stack
      alignItems="center"
      p={{ xs: '45px 16px 60px', tablet: '60px 16px 78px' }}
    >
      <Typography variant="title" mb={46}>
        整体師一覧
      </Typography>

      <Box width="100%" pt={30}>
        <ManipulatorCard />
        <ManipulatorCard />
        <ManipulatorCard />
      </Box>

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

export default ManipulatorList;
