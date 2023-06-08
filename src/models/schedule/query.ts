const scheduleQuery = {
  salonSchedule: ({ ...params }: Record<string, unknown>) => ({
    apiUrl: `/schedule/manipulator/daily-schedules`,
    queryKey: ['schedule', params],
    customParams: params,
  }),
  updateWorkingTimeSchedule: (
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
    apiUrl: `/schedule/manipulator/${manipulatorId}/daily-schedules`,
    useUrlQuery: false,
    method: 'put',
    enabled: enabledRequest,
    successMessage: '編集スケジュール成功',
  }),
};

export default scheduleQuery;
