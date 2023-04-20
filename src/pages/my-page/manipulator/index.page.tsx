import Layout from 'components/Layout';
import ManipulatorList from 'components/ManipulatorList';

const ManipulatorPage = () => {
  return <ManipulatorList />;
};

ManipulatorPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};

export default ManipulatorPage;
