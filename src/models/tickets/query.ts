const ticketQuery = {
  getSalonTickets: ({ salonId, ...args }: Record<string, unknown>) => ({
    apiUrl: `coupon/manipulator/tickets/${salonId}`,
    queryKey: [],
    customParams: args,
  }),
};

export default ticketQuery;
