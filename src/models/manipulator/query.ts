const manipulatorQuery = {
  getManipulators: ({ salonId, ...args }: Record<string, unknown>) => ({
    apiUrl: `account/manipulator/${salonId}/manipulators/`,
    queryKey: ['manipulator-list', salonId],
    customParams: args,
  }),
  updateManipulator: {
    apiUrl: (params: Record<string, unknown>) =>
      `/account/manipulator/register/${params.salonId}`,
    method: 'post',
    successMessage: 'レジスタが成功する',
    omitKeys: ['salonId'],
  },
};

export default manipulatorQuery;
