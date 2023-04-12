export interface ICustomerTickets {
  id: string;
  customerName: string;
  customerNameKana: string;
  tickets: ICouponTicket[];
}

export interface ICouponTicket {
  ticketId: string;
  name: string;
  expiredAt: string;
  availableCount: number;
}
