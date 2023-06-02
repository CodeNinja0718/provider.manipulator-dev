import { CircularProgress, Stack } from '@mui/material';
import Layout from 'components/Layout';
import MenuForm from 'components/MenuForm';
import type { MenuFormValues } from 'components/MenuForm/models/schema';
import MenuReview from 'components/MenuReview';
import { useList } from 'hooks';
import type { IStaff } from 'models/salon/interface';
import salonQuery from 'models/salon/query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useInitValue from '../../hook/useInitValue';

const RegisterMenuPage = () => {
  const router = useRouter();

  const { list: staffsList, isLoading } = useList<IStaff>(
    salonQuery.getManipulatorBySalon({
      salonId: router.query?.slug,
      limit: 100,
    }),
  );

  const initValues = { ...useInitValue() };

  const { confirm } = router.query;
  const isConfirm = typeof confirm === 'string' && confirm === 'true';

  const [menuData, setMenuData] = useState<MenuFormValues>(initValues);

  const viewConfirmScreen = (params: MenuFormValues) => {
    setMenuData(params);
    router.push(
      {
        pathname: `/my-page/menu/register/${router?.query.slug}`,
        query: {
          confirm: 'true',
        },
      },
      undefined,
      {
        shallow: true,
      },
    );
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="flex-start"
        minHeight={570}
        paddingTop={24}
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <>
      {isConfirm ? (
        <MenuReview menuData={menuData} staffs={staffsList || []} />
      ) : (
        <MenuForm
          onSubmit={viewConfirmScreen}
          defaultValues={menuData}
          staffs={staffsList || []}
        />
      )}
    </>
  );
};

RegisterMenuPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default RegisterMenuPage;
