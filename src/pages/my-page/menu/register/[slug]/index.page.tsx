import Layout from 'components/Layout';
import RegisterMenu from 'components/RegisterMenu';

const RegisterMenuPage = () => {
  return <RegisterMenu />;
};
RegisterMenuPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default RegisterMenuPage;
