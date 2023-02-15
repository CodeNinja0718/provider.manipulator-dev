import { Box } from '@mui/material';
import Layout from 'components/Layout';

const HomePage = () => {
  return <Box>HOME PAGE</Box>;
};

HomePage.getLayout = (page: React.ReactNode) => (
  <Layout isCardLayout>{page}</Layout>
);

export default HomePage;
