export interface IReservationItem {
  _id: string;
  startTime: string;
  endTime: string;
  cancelDeadline: string;
  customerInfo: ICustomerInfo;
  manipulatorInfo: IManipulatorInfo;
  result: ResultMenu;
  status: string;
  salonInfo: ISalonInfo;
  plan: IPlan;
}

export interface ICustomerInfo {
  name: string;
  nameKana: string;
  email: string;
  phone: string;
}

export interface IManipulatorInfo {
  manipulatorId: string;
  name: string;
  nameKana: string;
  email: string;
  pr: string;
  profile: string;
  photos: Photo[];
}

interface Photo {
  type: string;
  url: string;
  objectKey: string;
}

interface IMenuItem {
  name: string;
  estimatedTime: number;
  price: number;
  currency: string;
  menuId: string;
  order: number;
  status: string;
}
export interface ResultMenu {
  menuId: string;
  menuInfo: IMenuItem;
  amount: number;
  totalAmount: number;
  discountAmount: number;
}

export interface ISalonInfo {
  salonId: string;
  name: string;
  nameKana: string;
}

interface IMenuPlan extends IMenuItem {
  menuId: string;
  status: string;
  order: number;
}
interface IPlan {
  menuId: string;
  menuInfo: IMenuPlan;
  amount: number;
  totalAmount: number;
  discountAmount: number;
}
