const scheduleQuery = {
  salonSchedule: ({ ...params }: Record<string, unknown>) => ({
    apiUrl: `/schedule/manipulator/daily-schedules`,
    queryKey: ['schedule'],
    customParams: params,
  }),
  getWorkingTime: (
    date: string | any,
    salonId: string | any,
    enabledRequest: boolean,
  ) => ({
    queryKey: ['schedule', 'working-time', 'salonId', date],
    apiUrl: `schedule/${salonId}/schedules-within-date?date=${date}`,
    useUrlQuery: false,
    enabled: enabledRequest,
    cacheTime: 0,
  }),
  updateWorkingTime: (salonId: string | any, enabledRequest: boolean) => ({
    queryKey: ['schedule', 'working-time', 'salonId', 'update'],
    apiUrl: `schedule/${salonId}/schedules-within-date`,
    useUrlQuery: false,
    method: 'put',
    enabled: enabledRequest,
    successMessage: '編集スケジュール成功',
  }),
  getWorkingTimeByMani: (
    date: string | any,
    salonId: string | any,
    manipulatorId: string | any,
    enabledRequest: boolean,
  ) => ({
    queryKey: ['schedule', 'working-time', 'salonId', 'manipulatorId', date],
    apiUrl: `schedule/${salonId}/schedules-within-date/${manipulatorId}?date=${date}`,
    useUrlQuery: false,
    enabled: enabledRequest,
    cacheTime: 0,
  }),
  updateWorkingTimeByMani: (
    salonId: string | any,
    manipulatorId: string | any,
    enabledRequest: boolean,
  ) => ({
    queryKey: [
      'schedule',
      'working-time',
      'salonId',
      'manipulatorId',
      'update',
    ],
    apiUrl: `schedule/${salonId}/schedules-within-date/${manipulatorId}`,
    useUrlQuery: false,
    method: 'put',
    enabled: enabledRequest,
    successMessage: '編集スケジュール成功',
  }),
};

export default scheduleQuery;
