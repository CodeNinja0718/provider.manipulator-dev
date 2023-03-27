export interface IInquiry {
  key: string;
  name: string;
  id: string;
}

export interface IBankItem {
  _id: string;
  bankName: string;
  bankNameCode: string;
  bankCode: string;
  bankNameHiragana: string;
  addedFirstSearchChar: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBankBranchItem {
  _id: string;
  branchName: string;
  branchNameCode: string;
  bankCode: string;
  branchNameHiragana: string;
  postalCode: string;
  address: string;
  bankRef: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPrefectureItem {
  _id: number;
  name: string;
  provinceId: string;
  provinceName: string;
}

export interface IFeatureItem {
  _id: string;
  name: string;
}

export interface ISymptomItem {
  _id: number;
  symptomName: string;
  typeId: number;
}

export interface IStationItem {
  _id: number;
  name: string;
}
