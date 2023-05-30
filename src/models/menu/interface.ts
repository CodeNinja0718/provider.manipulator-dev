interface ITicket {
  price: number;
  numberOfTicket: number;
  expiryMonth: number;
  id: string;
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

export interface IMenuManipulator {
  _id: string;
  name: string;
  nameKana: string;
  email: string;
  profile: string;
}
