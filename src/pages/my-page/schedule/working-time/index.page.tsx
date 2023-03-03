import Layout from 'components/Layout';
import WorkingTime from 'components/WorkingTime';
import type { WorkingTimeFormValues } from 'components/WorkingTime/schema';
import dayjs from 'dayjs';
import { useFetch, useMutate } from 'hooks';
import type { IWorkingTime } from 'models/schedule/interface';
import scheduleQuery from 'models/schedule/query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const WorkingTimePage = () => {
  const router = useRouter();
  const defaultDate = dayjs(new Date()).format('YYYY-MM-DD');
  const [currentDate, setCurrentDate] = useState<string | any>(defaultDate);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setCurrentDate(router?.query?.date || defaultDate);
  }, [defaultDate, router]);

  const { data: res } = useFetch<IWorkingTime>(
    scheduleQuery.getWorkingTime(currentDate),
  );

  const { mutateAsync: handleUpdateMenu, isLoading } = useMutate(
    scheduleQuery.updateWorkingTime(),
  );

  const handleSubmit = (values: WorkingTimeFormValues) => {
    handleUpdateMenu(
      {
        ...values,
      },
      {
        onSuccess: () => {
          setDisabled(true);
          router.replace('/my-page/schedule');
        },
      },
    );
  };

  return (
    <WorkingTime
      onSubmit={handleSubmit}
      initialValues={res}
      loading={isLoading}
      disabled={disabled}
    />
  );
};

WorkingTimePage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};
export default WorkingTimePage;
