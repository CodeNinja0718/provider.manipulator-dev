import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import type { IReservationItem } from 'models/reservation/interface';
import type { ISalonScheduleItem } from 'models/schedule/interface';
import { DateFormat, SCHEDULE_DURATION, WORK_TIMES } from 'utils/const';

const DATE_TIME_FORMAT = DateFormat.YEAR_MONTH_DATE_HOUR_DASH;
const Common = {
  getDateTimeByDuration: (value: string | number | Date | dayjs.Dayjs) => {
    let result = dayjs(value);

    if (
      Number(dayjs(value).tz().format('mm')) > 0 &&
      (Number(dayjs(value).tz().format('mm')) < SCHEDULE_DURATION ||
        Number(dayjs(value).tz().format('mm')) < SCHEDULE_DURATION * 2)
    ) {
      let duration = SCHEDULE_DURATION;

      if (Number(dayjs(value).tz().format('mm')) < SCHEDULE_DURATION)
        duration = SCHEDULE_DURATION;
      if (
        Number(dayjs(value).tz().format('mm')) > SCHEDULE_DURATION &&
        Number(dayjs(value).tz().format('mm')) < SCHEDULE_DURATION * 2
      )
        duration = SCHEDULE_DURATION * 2;

      result = dayjs(value).minute(duration);
    }
    return result;
  },
  getReservations: (res: IReservationItem | any, date: string) => {
    const result = res?.docs || [];

    return result.map((item: any) => {
      // Get slots time
      let slotsTime = [
        {
          0: dayjs.utc(item?.startTime).tz().format(DATE_TIME_FORMAT),
          1: dayjs.utc(item?.endTime).tz().format(DATE_TIME_FORMAT),
        },
      ];

      // Format slotsTime
      if (!isEmpty(slotsTime)) {
        let formatSlotsTime:
          | string[]
          | number[]
          | Date[]
          | dayjs.Dayjs[]
          | any = [];

        slotsTime?.forEach((ele) => {
          const startTimeByDuration = Common.getDateTimeByDuration(
            dayjs(Object.assign([], ele)?.[0]),
          );
          const endTimeByDuration = Common.getDateTimeByDuration(
            dayjs(Object.assign([], ele)?.[1]),
          );
          formatSlotsTime = [startTimeByDuration, endTimeByDuration];
        });

        if (!isEmpty(formatSlotsTime)) {
          slotsTime = [
            {
              0: formatSlotsTime[0].format(DATE_TIME_FORMAT),
              1: formatSlotsTime[1].format(DATE_TIME_FORMAT),
            },
          ];
        }
      }

      // Render Slot Time List
      let slotTimeList: string[] = [];

      if (!isEmpty(slotsTime)) {
        const slotsTimeIndex = Object.assign([], slotsTime?.[0]).map(
          (el: any) => {
            return WORK_TIMES.indexOf(el.split(' ')?.[1]);
          },
        );

        const currentSlotsTime = WORK_TIMES.filter(
          (_item, index) =>
            index >= (slotsTimeIndex?.[0] || 0) &&
            index <= (slotsTimeIndex?.[1] || WORK_TIMES.length - 1),
        );

        slotTimeList = currentSlotsTime.map((_item, index) => {
          return dayjs(
            `${date} ${currentSlotsTime[index]}`,
            DATE_TIME_FORMAT,
          ).format(DATE_TIME_FORMAT);
        });
      }

      return {
        startTime: item?.startTime,
        endTime: item?.endTime,
        manipulatorId: item?.manipulatorInfo?.manipulatorId,
        id: item?._id,
        slots: slotTimeList,
      };
    });
  },
  getTimeRange: (date: string, workingTime: string[] = WORK_TIMES) => {
    return workingTime
      .slice(0, -1)
      .map((_time, index) => [
        dayjs(`${date} ${workingTime[index]}`, DATE_TIME_FORMAT).format(
          DATE_TIME_FORMAT,
        ),
        dayjs(`${date} ${workingTime[index + 1]}`, DATE_TIME_FORMAT).format(
          DATE_TIME_FORMAT,
        ),
      ]);
  },
  renderWorkingTimeRange: (data: ISalonScheduleItem, date: string) => {
    const workingTime = data?.schedule?.workingTime?.map((time) => {
      return {
        ...[
          dayjs.utc(time.startTime).tz().format(DATE_TIME_FORMAT),
          dayjs.utc(time.endTime).tz().format(DATE_TIME_FORMAT),
        ],
      };
    });

    if (!isEmpty(workingTime)) {
      const workingTimeIndex = Object.assign([], workingTime?.[0]).map(
        (item: any) => WORK_TIMES.indexOf(item.split(' ')?.[1]),
      );

      const currentWorkingTime = WORK_TIMES.filter(
        (_item, index) =>
          index >= (workingTimeIndex?.[0] || 0) &&
          index <= (workingTimeIndex?.[1] || WORK_TIMES.length - 1),
      );

      return Common.getTimeRange(date, currentWorkingTime);
    }
    return Common.getTimeRange(date);
  },
  renderAvailableTimeSlots: (data: ISalonScheduleItem, date: string) => {
    const availableTime = data?.schedule?.availableTime?.map((time) => {
      return {
        ...[
          dayjs.utc(time.startTime).tz().format(DATE_TIME_FORMAT),
          dayjs.utc(time.endTime).tz().format(DATE_TIME_FORMAT),
        ],
      };
    });

    if (!isEmpty(availableTime)) {
      const availableIndex = Object.assign([], availableTime?.[0]).map(
        (item: any) => WORK_TIMES.indexOf(item.split(' ')?.[1]),
      );

      const currentAvailable = WORK_TIMES.filter(
        (_item, index) =>
          index >= (availableIndex?.[0] || 0) &&
          index <= (availableIndex?.[1] || WORK_TIMES.length - 1),
      );

      const currentAvailableSlot = currentAvailable.map((_item, index) => {
        return dayjs(
          `${date} ${currentAvailable[index]}`,
          DATE_TIME_FORMAT,
        ).format(DATE_TIME_FORMAT);
      });

      return currentAvailableSlot;
    }
    return [];
  },
};
export default Common;
