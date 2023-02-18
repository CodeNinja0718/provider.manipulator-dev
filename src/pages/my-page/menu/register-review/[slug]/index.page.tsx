import Layout from 'components/Layout';
import MenuReview from 'components/MenuReview';

const RegisterReviewMenuPage = () => {
  return <MenuReview />;
};
RegisterReviewMenuPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default RegisterReviewMenuPage;
