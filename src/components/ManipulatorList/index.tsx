import ArrowRight from '@icons/arrow-right.svg';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'components/Link';
import ListPagination from 'components/ListPagination';
import { useList, useUser } from 'hooks';
import get from 'lodash/get';
import type { IManipulator } from 'models/manipulator/interface';
import manipulatorQuery from 'models/manipulator/query';
import { useRouter } from 'next/router';

import ManipulatorCard from './ManipulatorCard';
import styles from './styles';

const ManipulatorList = () => {
  const router = useRouter();
  const { keyword, page } = router.query;
  const { data } = useUser();

  const {
    list,
    isLoading,
    page: currentPage,
    total,
  } = useList<IManipulator>({
    ...manipulatorQuery.getManipulators({
      salonId: get(data, 'salon[0].salonId'),
      keyword,
      page: typeof page === 'string' ? page : 1,
    }),
    enabled: true,
    staleTime: 1000 * 60 * 2,
  });

  return (
    <Stack
      alignItems="center"
      p={{ xs: '45px 16px 60px', tablet: '60px 16px 78px' }}
    >
      <Typography variant="title" mb={46}>
        整体師一覧
      </Typography>
      {isLoading ? (
        <Stack
          alignItems="center"
          justifyContent="flex-start"
          minHeight={570}
          paddingTop={24}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Box width="100%" pt={30}>
          {list.map((item) => (
            <ManipulatorCard data={item} key={item._id} />
          ))}
        </Box>
      )}
      <Box display={'flex'}>
        <ListPagination limit={4} total={total} page={currentPage} />
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
