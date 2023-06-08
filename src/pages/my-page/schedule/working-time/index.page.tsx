import Layout from 'components/Layout';
import WorkingTime from 'components/WorkingTime';
import type { WorkingTimeFormValues } from 'components/WorkingTime/schema';
import dayjs from 'dayjs';
import { useList, useMutate, useUser } from 'hooks';
import type { ISalonScheduleItem } from 'models/schedule/interface';
import scheduleQuery from 'models/schedule/query';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { DateFormat } from 'utils/const';
import helpers from 'utils/helpers';
import queryClient from 'utils/queryClient';

const WorkingTimePage = () => {
  const router = useRouter();
  const { data: currentUserData, isOwner } = useUser();

  const { date } = router.query;
  const validDate = helpers.getValidDate(date);
  const [disabled, setDisabled] = useState(false);
  const salonInfo = currentUserData?.salon[0];

  const manipulatorIdParam = (router.query.manipulator as string) || '';
  const manipulatorId = !isOwner
    ? currentUserData?._id
    : manipulatorIdParam || currentUserData?._id;

  const enabledRequest =
    !!validDate && !!(salonInfo?.salonId || '') && !!manipulatorId;

  const { list, isLoading: loadingWorkingTime } = useList<ISalonScheduleItem>({
    ...scheduleQuery.salonSchedule({
      salonId: salonInfo?.salonId,
      manipulatorId,
      date: validDate,
      page: 1,
      limit: 1,
    }),
    enabled: enabledRequest,
    staleTime: 1000 * 60 * 2,
  });

  const { mutateAsync: handleUpdate, isLoading: loadingUpdate } = useMutate(
    scheduleQuery.updateWorkingTimeSchedule(manipulatorId, enabledRequest),
  );

  const dataLoad = useMemo(() => {
    if (!list || !list.length || !list[0]?.schedule) return null;
    const dataConvert = {
      ...list[0].schedule,
      date: dayjs
        .utc(list[0].schedule.date)
        .tz()
        .format(DateFormat.YEAR_MONTH_DATE_DASH),
      workingTime: list[0].schedule.workingTime.map((item) => ({
        startTime: dayjs.utc(item.startTime).tz().format(DateFormat.TIME),
        endTime: dayjs.utc(item.endTime).tz().format(DateFormat.TIME),
      })),
    };
    return dataConvert;
  }, [list]);

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
    const dataUpdate = {
      ...values,
      workingTime: values.workingTime?.map((item) => ({
        startTime: helpers.parseTimeIsoString(item.startTime, values.date),
        endTime: helpers.parseTimeIsoString(item.endTime, values.date),
      })),
      date: validDate,
    };

    handleUpdate(dataUpdate, {
      onSuccess: handleSuccess,
    });
  };

  return (
    <WorkingTime
      onSubmit={handleSubmit}
      initialValues={dataLoad}
      loading={loadingUpdate || loadingWorkingTime}
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
