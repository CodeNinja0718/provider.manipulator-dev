import { Box, CircularProgress } from '@mui/material';
import Layout from 'components/Layout';
import MenuForm from 'components/MenuForm';
import type { MenuFormValues } from 'components/MenuForm/models/schema';
import { useFetch, useMutate } from 'hooks';
import _pick from 'lodash/pick';
import type { IMenu } from 'models/menu/interface';
import menuQuery from 'models/menu/query';
import { useRouter } from 'next/router';

import styles from './styles';

const MenuDetailPage = () => {
  const router = useRouter();
  const { data: res } = useFetch<IMenu | any>(
    menuQuery.detailMenu(router?.query?.salonId, router?.query?.menuId),
  );
  const { mutateAsync: handleUpdateMenu } = useMutate(
    menuQuery.updateMenu(router?.query?.salonId, router?.query?.menuId),
  );

  const handleSubmit = (params: MenuFormValues) => {
    const data = {
      ..._pick(params, [
        'name',
        'order',
        'estimatedTime',
        'price',
        'menuTypes',
        'status',
        'currency',
        'timeDisplay',
      ]),
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
    };
    return <MenuForm onSubmit={handleSubmit} defaultValues={defaultFormData} />;
  }

  return (
    <Box sx={styles.loadingBox}>
      <CircularProgress size="small" sx={styles.loading} />
    </Box>
  );
};

MenuDetailPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default MenuDetailPage;
