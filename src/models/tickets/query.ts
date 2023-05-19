const ticketQuery = {
  getSalonTickets: ({ salonId, ...args }: Record<string, unknown>) => ({
    apiUrl: `coupon/manipulator/tickets/${salonId}`,
    queryKey: ['salon-tickets', salonId],
    customParams: args,
  }),
  getCustomerCoupons: ({ customerId, ...args }: Record<string, unknown>) => ({
    apiUrl: `/coupon/manipulator/coupons/customer/${customerId}`,
    queryKey: ['customer-coupons', customerId],
    customParams: args,
    enabled: !!customerId,
  }),
  getCustomerTickets: ({ customerId, ...args }: Record<string, unknown>) => ({
    apiUrl: `/coupon/manipulator/tickets/customer/${customerId}`,
    queryKey: ['customer-tickets', customerId, 'tickets-list'],
    customParams: args,
    enabled: !!customerId,
  }),
};

export default ticketQuery;
