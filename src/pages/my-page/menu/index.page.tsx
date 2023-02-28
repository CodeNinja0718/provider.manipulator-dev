import Layout from 'components/Layout';
import MenuList from 'components/MenuList';

const MenuPage = () => {
  return <MenuList />;
};
MenuPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default MenuPage;
