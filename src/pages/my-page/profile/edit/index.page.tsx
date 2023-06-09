import Layout from 'components/Layout';
import ManipulatorRegisterPage from 'pages/my-page/manipulator/[manipulatorId]/index.page';
import type { PageProps } from 'utils/type';

const EditProfilePage = () => {
  return <ManipulatorRegisterPage editMyProfile />;
};

EditProfilePage.getLayout = (page: React.ReactNode, pageProps: PageProps) => {
  return (
    <Layout isCardLayout withSideMenu {...pageProps}>
      {page}
    </Layout>
  );
};

export default EditProfilePage;
