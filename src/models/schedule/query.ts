const scheduleQuery = {
  salonSchedule: ({ salonId, ...params }: Record<string, unknown>) => ({
    apiUrl: `/schedule/${salonId}/daily-schedules`,
    queryKey: ['salon', 'schedule'],
    customParams: params,
  }),
};

export default scheduleQuery;
