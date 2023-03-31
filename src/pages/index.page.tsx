import { Box } from '@mui/material';
import BenefitUsed from 'components/Home/BenefitUsed';
import Feature from 'components/Home/Feature';
import TopBanner from 'components/Home/TopBanner';
import Layout from 'components/Layout';
import dynamic from 'next/dynamic';

const Membership = dynamic(() => import('components/Home/Membership'));
const FAQ = dynamic(() => import('components/Home/FAQ'), { ssr: false });

const HomePage = () => {
  return (
    <Box pb={{ xs: 58, tablet: 100 }} bgcolor="white">
      <TopBanner />
      <BenefitUsed />
      <Feature />
      <Membership />
      <FAQ />
      <Membership />
    </Box>
  );
};

HomePage.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default HomePage;
