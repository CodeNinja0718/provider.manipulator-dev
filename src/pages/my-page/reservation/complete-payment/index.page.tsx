import Layout from 'components/Layout';
import PaymentCompleted from 'components/Reservation/Payment/PaymentCompleted';

const ReservationCompletePaymentPage = () => {
  return <PaymentCompleted />;
};

ReservationCompletePaymentPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default ReservationCompletePaymentPage;
