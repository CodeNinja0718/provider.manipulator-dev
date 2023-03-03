import Layout from 'components/Layout';
import WorkingTime from 'components/WorkingTime';
import type { WorkingTimeFormValues } from 'components/WorkingTime/schema';

const dataMock: WorkingTimeFormValues = {
  businessHours: [
    {
      weekDay: 0,
      isHoliday: false,
      hours: [
        { startTime: '10:00', endTime: '13:00' },
        { startTime: '15:00', endTime: '18:00' },
      ],
    },
  ],
};
const handleSubmit = (values: WorkingTimeFormValues) => {
  console.log('handleSubmit', values);
};
const WorkingTimePage = () => {
  return <WorkingTime onSubmit={handleSubmit} initialValues={dataMock} />;
};
WorkingTimePage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default WorkingTimePage;
