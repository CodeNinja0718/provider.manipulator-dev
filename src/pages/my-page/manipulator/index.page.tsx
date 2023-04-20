import Layout from 'components/Layout';
import MenuList from 'components/ManipulatorList';

const ManipulatorPage = () => {
  return <MenuList />;
};

ManipulatorPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};

export default ManipulatorPage;
