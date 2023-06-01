import Layout from 'components/Layout';
import ManipulatorRegisterPage from 'pages/my-page/manipulator/[manipulatorId]/index.page';

const EditProfilePage = () => {
  return <ManipulatorRegisterPage editMyProfile />;
};

EditProfilePage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};

export default EditProfilePage;
