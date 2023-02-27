import dayjs from 'dayjs';
import { Regex } from 'utils/const';
import type { InferType } from 'yup';
import { array, boolean, number, object, string } from 'yup';

const parseTimeSlot = (time: string | undefined) => {
  const timeSplit = time?.split(':');
  if (timeSplit) {
    return dayjs().hour(Number(timeSplit[0])).minute(Number(timeSplit[1]));
  }
  return dayjs();
};

const schema = object({
  name: string().trim().required(),
  nameKana: string()
    .trim()
    .required()
    .matches(Regex.KATAKANA, 'Katakana invalid'),
  email: string().required().matches(Regex.EMAIL, 'Email invalid'),
  phone: string()
    .trim()
    .required()
    .matches(Regex.PHONE, 'Phone number is not valid'),
  zipcode: string()
    .required()
    .matches(Regex.JP_ZIPCODE, 'Zip code is not valid'),
  prefecture: string().required(),
  address: string().trim().required(),
  city: string().trim().required(),
  access: array()
    .of(
      object({
        value: string().required(),
      }),
    )
    .required(),
  features: array(),
  photos: array(),
  description: string(),
  areaId: string().required(),
  stationIds: array().min(1).required(),
  bank: object().nullable(true).required(),
  branch: object().nullable(true).required(),
  bankInfo: object({
    transferType: string().required(),
    accountNumber: string().required(),
    accountName: string().required(),
  }),
  businessHours: array()
    .of(
      object({
        weekDay: number().required(),
        isHoliday: boolean().required(),
        hours: array()
          .min(1)
          .when('isHoliday', {
            is: (isHoliday: boolean) => !isHoliday,
            then: array()
              .of(
                object({
                  startTime: string().required(),
                  endTime: string()
                    .test(
                      'is-end-time-after-start',
                      'End time must be after start time',
                      (value, context) => {
                        const { parent } = context;
                        if (!value || !parent.startTime) {
                          return true;
                        }
                        const startTime = parseTimeSlot(parent.startTime);
                        const endTime = parseTimeSlot(value);
                        return endTime.diff(startTime, 'minute') > 0;
                      },
                    )
                    .required(),
                }),
              )
              .test(
                'is-non-overlapping',
                'Time slots must not overlap with each other',
                /*
                 * Finds if two intervals overlap using the 'Sweep line' approach.
                 * Learn more: https://www.baeldung.com/cs/finding-all-overlapping-intervals
                 */
                (value) => {
                  if (value?.length) {
                    const sortedSlots = value
                      .map((slot) => ({
                        startTime: parseTimeSlot(slot?.startTime),
                        endTime: parseTimeSlot(slot?.endTime),
                      }))
                      .sort((a, b) =>
                        a.startTime.isAfter(b.startTime) ? 1 : -1,
                      );

                    let prevEnd = null;
                    for (let i = 0; i < sortedSlots.length; i += 1) {
                      const { startTime, endTime } = sortedSlots[i]!;
                      if (prevEnd && prevEnd.isAfter(startTime)) {
                        return false;
                      }
                      prevEnd = endTime;
                    }
                  }
                  return true;
                },
              ),
            // .test(
            //   'is-sorted-chronological',
            //   'Time slot list must be in chronological order',
            //   function (value) {
            //     const timeSlots = value.map((timeSlot) => ({
            //       start: parseTimeSlot(timeSlot.start),
            //       end: parseTimeSlot(timeSlot.end),
            //     }));
            //     const sortedTimeSlots = [...timeSlots].sort(
            //       (a, b) =>
            //         a.start.getTime() - b.start.getTime() ||
            //         a.end.getTime() - b.end.getTime(),
            //     );
            //     for (let i = 0; i < timeSlots.length; i++) {
            //       if (
            //         timeSlots[i].start.getTime() !==
            //           sortedTimeSlots[i].start.getTime() ||
            //         timeSlots[i].end.getTime() !==
            //           sortedTimeSlots[i].end.getTime()
            //       ) {
            //         return false;
            //       }
            //     }
            //     return true;
            //   },
            // ),
          }),
      }),
    )
    .required(),
});

export default schema;
export type ProfileFormValues = InferType<typeof schema>;
