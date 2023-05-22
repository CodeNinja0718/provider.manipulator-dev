const manipulatorQuery = {
  getManipulators: ({ salonId, ...args }: Record<string, unknown>) => ({
    apiUrl: `account/manipulator/${salonId}/manipulators/`,
    queryKey: ['manipulator-list', salonId],
    customParams: args,
  }),
  registerManipulator: {
    apiUrl: (params: Record<string, unknown>) =>
      `/account/manipulator/register/${params.salonId}`,
    method: 'post',
    successMessage: 'アップデートが成功した',
    omitKeys: ['salonId'],
  },
  updateManipulator: {
    apiUrl: (params: Record<string, unknown>) =>
      `/account/manipulator/profile/${params.manipulatorId}`,
    method: 'patch',
    successMessage: 'レジスタが成功する',
    omitKeys: ['salonId'],
  },
  manipulatorDetail: (id: string | any) => ({
    apiUrl: `/account/manipulator/${id}`,
    queryKey: ['manipulator-detail', id],
    enabled: !!id,
  }),
};

export default manipulatorQuery;
