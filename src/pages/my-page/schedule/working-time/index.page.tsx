import Layout from 'components/Layout';
import WorkingTime from 'components/WorkingTime';
import type { WorkingTimeFormValues } from 'components/WorkingTime/schema';
import { useFetch, useMutate, useUser } from 'hooks';
import type { IWorkingTime } from 'models/schedule/interface';
import scheduleQuery from 'models/schedule/query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import helpers from 'utils/helpers';
import queryClient from 'utils/queryClient';

const WorkingTimePage = () => {
  const router = useRouter();
  useUser({ enabled: false });
  const currentUserQuery = queryClient
    .getQueryCache()
    .findAll(['currentUser'])
    .map((each) => {
      return each?.state?.data;
    });
  const { date } = router.query;
  const validDate = helpers.getValidDate(date);
  const [disabled, setDisabled] = useState(false);
  const salonInfo: any = currentUserQuery?.[0];
  const enabledRequest =
    !!validDate && !!(salonInfo?.salon?.[0]?.salonId || '');

  const { data: res } = useFetch<IWorkingTime>(
    scheduleQuery.getWorkingTime(
      validDate,
      salonInfo?.salon?.[0]?.salonId,
      enabledRequest,
    ),
  );

  const { mutateAsync: handleUpdateMenu, isLoading } = useMutate(
    scheduleQuery.updateWorkingTime(
      salonInfo?.salon?.[0]?.salonId,
      enabledRequest,
    ),
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
