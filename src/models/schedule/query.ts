const scheduleQuery = {
  salonSchedule: ({ salonId, ...params }: Record<string, unknown>) => ({
    apiUrl: `/schedule/${salonId}/daily-schedules`,
    queryKey: ['salon', 'schedule'],
    customParams: params,
  }),
  getWorkingTime: (date: string | any) => ({
    queryKey: ['working-time', 'me', date],
    apiUrl: `schedule/me/schedules-within-date?date=${date}`,
    useUrlQuery: false,
    enabled: !!date,
    cacheTime: 0,
  }),
  updateWorkingTime: () => ({
    queryKey: ['working-time', 'me', 'update'],
    apiUrl: 'schedule/me/schedules-within-date',
    useUrlQuery: false,
    method: 'put',
    successMessage: '編集スケジュール成功',
  }),
};

export default scheduleQuery;
