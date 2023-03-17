import { Box, Typography } from '@mui/material';
import Layout from 'components/Layout';
import Registration from 'components/Reservation/Registration';

import styles from './styles';

const ReservationRegistrationPage = () => {
  return (
    <Box sx={styles.boxWrapper}>
      <Box display="flex" justifyContent="center">
        <Typography variant="title">予約登録</Typography>
      </Box>

      <Box display="flex" mt={40} flexDirection="column" gap={40}>
        <Registration />
      </Box>
    </Box>
  );
};
ReservationRegistrationPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default ReservationRegistrationPage;
