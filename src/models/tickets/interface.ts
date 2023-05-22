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
  salonId: string;
  salonName: string;
  salonNameKana: string;
  menuId: string;
  price: number;
}

export interface ICoupon {
  amount: number;
  code: string;
  currency: string;
  description: string;
  expiredAt: string;
  id: number | string;
  menu: any[];
  rules: Record<string, unknown>[];
  title: string;
}

export interface ISelectableCoupon extends ICoupon {
  name: string;
}
