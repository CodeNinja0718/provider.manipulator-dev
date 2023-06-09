import { Box, CircularProgress } from '@mui/material';
import Layout from 'components/Layout';
import MenuForm from 'components/MenuForm';
import type { MenuFormValues } from 'components/MenuForm/models/schema';
import { useFetch, useList, useMutate } from 'hooks';
import _pick from 'lodash/pick';
import type { IMenu } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import type { IStaff } from 'models/salon/interface';
import salonQuery from 'models/salon/query';
import { useRouter } from 'next/router';
import type { PageProps } from 'utils/type';

import styles from './styles';

const MenuDetailPage = () => {
  const router = useRouter();
  const { data: res } = useFetch<IMenu | any>(
    menuQuery.detailMenu(router?.query?.salonId, router?.query?.menuId),
  );
  const { mutateAsync: handleUpdateMenu } = useMutate(
    menuQuery.updateMenu(router?.query?.salonId, router?.query?.menuId),
  );

  const { list: staffsList } = useList<IStaff>(
    salonQuery.getManipulatorBySalon({
      salonId: router.query?.salonId,
      limit: 100,
    }),
  );

  const handleSubmit = (params: MenuFormValues) => {
    const data = {
      ..._pick(params, [
        'name',
        'order',
        'estimatedTime',
        'menuTypes',
        'status',
        'currency',
        'timeDisplay',
      ]),
      ...(params.menuTypes?.includes('one_time') && { price: params.price }),
      ticket: {
        price: params?.ticketPrice || 0,
        numberOfTicket: params?.ticketMount || 0,
        expiryMonth: params?.couponExpirationDate || 1,
      },
      manipulatorIds: res?.manipulatorIds,
    };

    handleUpdateMenu(
      {
        ...data,
      },
      {
        onSuccess: () => {
          router.replace('/my-page/menu');
        },
      },
    );
  };

  if (res) {
    const defaultFormData = {
      ...res,
      ticketPrice: res?.ticket?.price || 0,
      ticketMount: res?.ticket?.numberOfTicket || 0,
      couponExpirationDate: res?.ticket?.expiryMonth || 1,
      availableStaff: res?.manipulatorIds || [],
    };

    return (
      <MenuForm
        onSubmit={handleSubmit}
        defaultValues={defaultFormData}
        staffs={staffsList || []}
      />
    );
  }

  return (
    <Box sx={styles.loadingBox}>
      <CircularProgress size="small" sx={styles.loading} />
    </Box>
  );
};

MenuDetailPage.getLayout = (page: React.ReactNode, pageProps: PageProps) => {
  return (
    <Layout isCardLayout withSideMenu {...pageProps}>
      {page}
    </Layout>
  );
};
export default MenuDetailPage;
