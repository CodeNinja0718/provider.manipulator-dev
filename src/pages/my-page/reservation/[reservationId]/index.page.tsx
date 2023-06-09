import Layout from 'components/Layout';
import Form from 'components/Reservation/Form';
import type { PageProps } from 'utils/type';

const ReservationDetailPage = () => {
  return <Form />;
};

ReservationDetailPage.getLayout = (
  page: React.ReactNode,
  pageProps: PageProps,
) => {
  return (
    <Layout isCardLayout withSideMenu {...pageProps}>
      {page}
    </Layout>
  );
};
export default ReservationDetailPage;
