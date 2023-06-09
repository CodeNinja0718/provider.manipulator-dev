import Layout from 'components/Layout';
import PaymentCompleted from 'components/Reservation/Payment/PaymentCompleted';
import type { PageProps } from 'utils/type';

const ReservationCompletePaymentPage = () => {
  return <PaymentCompleted />;
};

ReservationCompletePaymentPage.getLayout = (
  page: React.ReactNode,
  pageProps: PageProps,
) => {
  return (
    <Layout isCardLayout withSideMenu {...pageProps}>
      {page}
    </Layout>
  );
};
export default ReservationCompletePaymentPage;
