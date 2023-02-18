const menuQuery = {
  searchManiplator: (salonId: string) => ({
    queryKey: ['menu', 'list', 'salonId', salonId],
    apiUrl: `salon/${salonId}/menu/list`,
    staleTime: Infinity,
    useUrlQuery: false,
    enabled: !!salonId,
  }),
};

export default menuQuery;
