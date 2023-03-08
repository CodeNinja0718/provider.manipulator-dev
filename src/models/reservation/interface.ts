export interface IReservationItem {
  _id: string;
  startTime: string;
  endTime: string;
  customerInfo: ICustomerInfo;
  manipulatorInfo: IManipulatorInfo;
  result: ResultMenu;
}

export interface ICustomerInfo {
  name: string;
  nameKana: string;
}

export interface IManipulatorInfo {
  name: string;
  nameKana: string;
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
}

interface ResultMenu {
  menuInfo: IMenuItem;
}
