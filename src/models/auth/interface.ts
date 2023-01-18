import type { Gender } from 'utils/type';

export interface ICustomer {
  createdAt: string;
  email: string;
  id: string;
  status: string;
  updatedAt: string;
  gender?: Gender;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: {
    token: string;
  };
}
