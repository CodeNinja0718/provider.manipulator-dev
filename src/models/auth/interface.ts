export interface IProvider {
  createdAt: string;
  email: string;
  _id: string;
  status: string;
  updatedAt: string;
  type: string;
  reviewRating: {
    total: number;
    averageRating: number;
  };
  salon: {
    salonId: string;
    name: string;
    nameKana: string;
    access: string[];
  }[];
  menus: any[];
  isNewRegistration: boolean;
  isPublished: boolean;
}
export interface LoginPayload {
  email: string;
  password: string;
}
