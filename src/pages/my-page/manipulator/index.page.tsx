import Layout from 'components/Layout';
import ManipulatorList from 'components/ManipulatorList';
import type { PageProps } from 'utils/type';

const ManipulatorPage = () => {
  return <ManipulatorList />;
};

ManipulatorPage.getLayout = (page: React.ReactNode, pageProps: PageProps) => {
  return (
    <Layout isCardLayout withSideMenu {...pageProps}>
      {page}
    </Layout>
  );
};

export default ManipulatorPage;
