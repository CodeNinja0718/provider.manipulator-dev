import ArrowLeft from '@icons/arrow-left.svg';
import ArrowRight from '@icons/arrow-right.svg';
import { Box, Button, Stack, Typography } from '@mui/material';
import Layout from 'components/Layout';
import PaymentDetail from 'components/Reservation/Payment/PaymentDetail';
import CustomerDetail from 'components/Reservation/ReservationDetail/CustomerDetail';

import styles from './styles';

const PaymentConfirmationPage = () => {
  const data = {
    startTime: '2023-03-09T00:00:00.000Z',
    endTime: '2023-03-09T01:30:00.000Z',
    customerInfo: {
      email: 'customer.0900000001@yopmail.com',
      name: 'Customer.0900000001',
      nameKana: 'ァカナハ',
      phone: '0900000001',
    },
    salonInfo: {
      name: 'Demo Salon 01',
      nameKana: 'Demo Salon 01 (Kana)',
      salonId: '63f57c5b62ea1ae3d6f48256',
    },
    amount: 15,
    discountAmount: 0,
    menuId: '63fc2f575f8b4c23feaf47b4',
    menuInfo: {
      currency: 'JPY',
      estimatedTime: 240,
      menuId: '63fc2f575f8b4c23feaf47b4',
      name: 'menu 07',
      order: 3,
      price: 15,
      status: 'public',
    },
    totalAmount: 15,
  };
  return (
    <Box sx={styles.paymentConfirmationWrapper}>
      <Box display="flex" justifyContent="center" sx={styles.title}>
        <Typography variant="title">決済</Typography>
      </Box>

      <Box display="flex" flexDirection="column" sx={styles.contentBox}>
        <CustomerDetail {...data.customerInfo} />
        <PaymentDetail {...data} />

        <Stack spacing={20} direction="column" alignItems="center">
          <Button
            variant="contained"
            endIcon={<ArrowRight />}
            sx={styles.button}
            onClick={() => {}}
          >
            決済する
          </Button>
          <Button
            variant="outlined"
            startIcon={<ArrowLeft />}
            sx={styles.button}
            onClick={() => {}}
          >
            修正する
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

PaymentConfirmationPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default PaymentConfirmationPage;
