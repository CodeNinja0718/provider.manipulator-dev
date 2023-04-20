import { Stack, Typography } from '@mui/material';
import Layout from 'components/Layout';
import ManipulatorProfile from 'components/ManipulatorProfile/Form';
import type { ManipulatorProfileValues } from 'components/ManipulatorProfile/Form/schema';
// import { useUser } from 'hooks';
import range from 'lodash/range';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const ManipulatorRegisterPage = () => {
  // const { data } = useUser();
  const router = useRouter();
  const initBusinessHours = useMemo(
    () =>
      range(7).map((index) => ({
        weekDay: index,
        isHoliday: false,
        hours: [{ startTime: '09:00', endTime: '20:00' }],
      })),
    [],
  );

  const initialValues = {
    name: '',
    nameKana: '',
    email: '',
    isRegister: [{ id: 'confirm_register', name: 'アカウントを新規発行する' }],
    businessHours: initBusinessHours,
    engagement: 2000,
    qualification: [],
    description: '',
    pr: '',
    photos: [],
    symptoms: [],
  };

  const handleSubmit = (_values: ManipulatorProfileValues) => {
    // console.log(_values);
    router.push('/my-page/manipulator');
  };

  return (
    <Stack alignItems="center" p={{ xs: '45px 0 60px', tablet: '60px 0 78px' }}>
      <Typography variant="title" mb={55}>
        整体院情報登録
      </Typography>
      <ManipulatorProfile
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </Stack>
  );
};

ManipulatorRegisterPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};

export default ManipulatorRegisterPage;
