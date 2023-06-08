const salonQuery = {
  createSalon: {
    apiUrl: '/salon/salons',
    method: 'post',
    successMessage: '完了しました',
  },
  getSalonDetail: ({
    salonId = '',
    disabledToFetch = false,
  }: Record<string, unknown>) => ({
    apiUrl: `/salon/salons/${salonId}`,
    queryKey: ['salon-detail', { salonId }],
    enabled: !!salonId && !disabledToFetch,
  }),
  updateSalon: {
    apiUrl: (params: Record<string, unknown>) =>
      `/salon/salons/${params.salonId}`,
    method: 'put',
    successMessage: '完了しました',
    omitKeys: ['salonId'],
  },
  getManipulatorBySalon: ({
    salonId = '',
    ...args
  }: Record<string, unknown>) => ({
    apiUrl: `/salon/salons/${salonId}/manipulators`,
    queryKey: ['manipulator', 'salon-manipulator', salonId],
    enabled: !!salonId,
    customParams: args,
  }),
};

export default salonQuery;
