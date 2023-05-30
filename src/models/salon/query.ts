const salonQuery = {
  createSalon: {
    apiUrl: '/salon/salons',
    method: 'post',
    successMessage: 'お支払い方法を削除しました',
  },
  getSalonDetail: ({ salonId = '' }: Record<string, unknown>) => ({
    apiUrl: `/salon/salons/${salonId}`,
    queryKey: ['salon-detail', { salonId }],
    enabled: !!salonId,
  }),
  updateSalon: {
    apiUrl: (params: Record<string, unknown>) =>
      `/salon/salons/${params.salonId}`,
    method: 'put',
    successMessage: 'お支払い方法を削除しました',
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
