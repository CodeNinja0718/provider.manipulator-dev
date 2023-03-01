import Layout from 'components/Layout';

const ProfilePage = () => {
  return <>This is Profile</>;
};
ProfilePage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default ProfilePage;
