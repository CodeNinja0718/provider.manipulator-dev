import Layout from 'components/Layout';
import MenuList from 'components/MenuList';
import type { PageProps } from 'utils/type';

const MenuPage = ({ isOwnerSsr }: PageProps) => {
  return <MenuList isOwnerSsr={isOwnerSsr} />;
};
MenuPage.getLayout = (page: React.ReactNode, pageProps: PageProps) => {
  return (
    <Layout isCardLayout withSideMenu {...pageProps}>
      {page}
    </Layout>
  );
};
export default MenuPage;
