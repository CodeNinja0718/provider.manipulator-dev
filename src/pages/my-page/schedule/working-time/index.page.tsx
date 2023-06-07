import Layout from 'components/Layout';
import WorkingTime from 'components/WorkingTime';
import type { WorkingTimeFormValues } from 'components/WorkingTime/schema';
import { useFetch, useMutate, useUser } from 'hooks';
import type { IWorkingTime } from 'models/schedule/interface';
import scheduleQuery from 'models/schedule/query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import helpers from 'utils/helpers';
import queryClient from 'utils/queryClient';

const WorkingTimePage = () => {
  const router = useRouter();
  const { data: currentUserData, isOwner } = useUser();

  const { date } = router.query;
  const validDate = helpers.getValidDate(date);
  const [disabled, setDisabled] = useState(false);
  const salonInfo = currentUserData?.salon[0];

  const manipulatorId = (router.query.manipulator as string) || '';

  const enabledRequest =
    !!validDate && !!(salonInfo?.salonId || '') && isOwner && !manipulatorId;
  const enabledRequestByMani =
    !!validDate && !!(salonInfo?.salonId || '') && !isOwner;

  const { data: res } = useFetch<IWorkingTime>(
    scheduleQuery.getWorkingTime(validDate, salonInfo?.salonId, enabledRequest),
  );

  const { data: resByMani, refetch } = useFetch<IWorkingTime>(
    scheduleQuery.getWorkingTimeByMani(
      validDate,
      salonInfo?.salonId,
      !isOwner ? currentUserData?._id : manipulatorId,
      enabledRequestByMani,
    ),
  );

  const { mutateAsync: handleUpdateMenu, isLoading } = useMutate(
    scheduleQuery.updateWorkingTime(salonInfo?.salonId, enabledRequest),
  );

  const {
    mutateAsync: handleUpdateMenuByMani,
    isLoading: isLoadingUpdateMenuByMani,
  } = useMutate(
    scheduleQuery.updateWorkingTimeByMani(
      salonInfo?.salonId,
      !isOwner ? currentUserData?._id : manipulatorId,
      enabledRequestByMani,
    ),
  );

  useEffect(() => {
    if (manipulatorId) {
      refetch();
    }
  }, [manipulatorId, refetch]);

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['schedule'],
    });
    setDisabled(true);
    router.push({
      pathname: '/my-page/schedule',
      query: {
        date: validDate,
      },
    });
  };

  const handleSubmit = (values: WorkingTimeFormValues) => {
    if (isOwner && !manipulatorId) {
      handleUpdateMenu(
        {
          ...values,
        },
        {
          onSuccess: handleSuccess,
        },
      );
    } else {
      handleUpdateMenuByMani(
        {
          ...values,
        },
        {
          onSuccess: handleSuccess,
        },
      );
    }
  };

  return (
    <WorkingTime
      onSubmit={handleSubmit}
      initialValues={isOwner && !manipulatorId ? res : resByMani}
      loading={isLoading || isLoadingUpdateMenuByMani}
      disabled={disabled}
      isOwner={isOwner}
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
