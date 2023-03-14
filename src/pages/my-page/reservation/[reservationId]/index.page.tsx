import Layout from 'components/Layout';
import Form from 'components/Reservation/Form';

const ReservationDetailPage = () => {
  return <Form />;
};

ReservationDetailPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default ReservationDetailPage;
