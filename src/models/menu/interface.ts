interface ITicket {
  price: number;
  amout: number;
}
export interface IMenu {
  _id: string;
  salonId: string;
  createdById: string;
  name: string;
  order: string;
  price: number;
  estimatedTime: number;
  manipulatorIds: string[];
  menuTypes: string[];
  timeDisplay: boolean;
  currency: 'JPY' | string;
  ticket: ITicket;
  status: 'public' | 'private' | string;
}