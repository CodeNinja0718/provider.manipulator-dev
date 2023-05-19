export interface IManipulator {
  _id: string;
  name: string;
  nameKana: string;
  email: string;
  photos: Photo[];
  status: string;
}

interface Photo {
  type: string;
  url: string;
  objectKey: string;
}

type BusinessHour = {
  weekDay: number;
  isHoliday: boolean;
  hours: { startTime: string; endTime: string }[];
};

export interface IManipulatorItem {
  photos: Photo[];
  name: string;
  nameKana: string;
  email: string;
  isPublished: true;
  careerStart: string;
  nationalLicenses: string[];
  profile: string;
  pr: string;
  supportedSymptoms: { id: string; name: string }[];
  defaultShifts: BusinessHour[];
  verifyEmail: boolean;
}
