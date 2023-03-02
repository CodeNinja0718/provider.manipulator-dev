export interface ISalonScheduleItem {
  manipulatorId: string;
  manipulatorName: string;
  manipulatorNameKana: string;
  availableTimeSlots: string[];
  reservations: IReservationItem[];
}

export interface IReservationItem {
  slots: string[];
  startTime: string;
  endTime: string;
  id: string;
}
