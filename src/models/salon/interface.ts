export interface ISalonDetail {
  _id: string;
  name: string;
  nameKana: string;
  access: string[];
  phone: string;
  email: string;
  zipcode: string;
  addresses: {
    address: string;
    areaId: number;
    city: string;
    prefectureId: number;
    prefectureName: string;
    lineId: number;
    stationIds: number[];
    stations: {
      id: number;
      name: string;
    }[];
  }[];
  features?: {
    id: string;
    name: string;
  }[];
  photos?: {
    objectKey: string;
    type: string;
    url: string;
  }[];
  description?: string;
  bankInfo: {
    accountName: string;
    accountNumber: string;
    bankId: string;
    bankName: string;
    branchId: string;
    branchName: string;
    transferType: number;
  };
  businessHours: {
    weekDay: number;
    isHoliday: boolean;
    hours: { startTime: string; endTime: string }[];
  }[];
}
