export interface ISalonScheduleItem {
  _id: string;
  name: string;
  nameKana: string;
  type: string;
  schedule: IWorkingTime;
}
export interface IReservationItem {
  slots: string[];
  startTime: string;
  endTime: string;
  id: string;
}

export interface IWorkingTime {
  date: string;
  workingTime: [
    {
      startTime: string;
      endTime: string;
    },
  ];
  isDayOff: boolean;
  isEmpty?: boolean;
  availableTime?: {
    startTime: string;
    endTime: string;
  }[];
}
