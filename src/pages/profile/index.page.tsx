import Layout from 'components/Layout';
import dynamic from 'next/dynamic';

const ProfileComponent = dynamic(() => import('components/ProfileComponent'));

const ProfilePage = () => {
  return <ProfileComponent initialValues={{ name: '' }} onSubmit={() => {}} />;
};

ProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout isCardLayout>{page}</Layout>;
};

export default ProfilePage;
