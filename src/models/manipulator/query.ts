const manipulatorQuery = {
  getManipulators: ({ salonId, ...args }: Record<string, unknown>) => ({
    apiUrl: `account/manipulator/${salonId}/manipulators/`,
    queryKey: ['manipulator-list', salonId],
    customParams: args,
  }),
};

export default manipulatorQuery;
