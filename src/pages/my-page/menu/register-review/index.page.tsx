import Layout from 'components/Layout';

import useInitValue from '../hook/useInitValue';

const RegisterReviewMenuPage = () => {
  const initialValues = useInitValue();
  console.log(initialValues);
  return <>This is review</>;
};
RegisterReviewMenuPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default RegisterReviewMenuPage;
