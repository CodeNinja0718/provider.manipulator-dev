import { Stack, Typography } from '@mui/material';
import Layout from 'components/Layout';
import CompleteProfileForm from 'components/Profile/Form';
import type { ProfileFormValues } from 'components/Profile/Form/schema';
// import { useUser } from 'hooks';
import range from 'lodash/range';
import { useMemo } from 'react';

const CompleteProfilePage = () => {
  const businessHours = useMemo(
    () =>
      range(7).map((index) => ({
        weekDay: index,
        isHoliday: false,
        hours: [{ startTime: '', endTime: '' }],
      })),
    [],
  );

  const handleSubmit = ({ ...values }: ProfileFormValues) => {
    console.log(
      '🚀 ~ file: index.page.tsx:20 ~ handleSubmit ~ values:',
      values,
    );
    const access = values?.access.map((item: { value: string }) => item?.value);
    const params = { ...values, access };
    console.log(params);
  };

  return (
    <Stack alignItems="center" p="60px 0 78px">
      <Typography variant="title" mb={55}>
        整体院情報登録
      </Typography>
      <CompleteProfileForm
        initialValues={{
          name: '',
          nameKana: '',
          phone: '',
          email: 'demo@gmail.com',
          zipcode: '',
          prefecture: 1,
          address: '',
          city: '',
          access: [{ value: '' }],
          feature: [],
          description: '',
          photos: [],
          bank: {},
          branch: {},
          bankInfo: {
            transferType: 0,
            accountNumber: '',
            accountName: '',
          },
          businessHours,
        }}
        onSubmit={handleSubmit}
      />
    </Stack>
  );
};

CompleteProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout isCardLayout>{page}</Layout>;
};

export default CompleteProfilePage;
