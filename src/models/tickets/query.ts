const ticketQuery = {
  getSalonTickets: ({ salonId, ...args }: Record<string, unknown>) => ({
    apiUrl: `coupon/manipulator/tickets/${salonId}`,
    queryKey: ['salon-tickets', salonId],
    customParams: args,
  }),
};

export default ticketQuery;
