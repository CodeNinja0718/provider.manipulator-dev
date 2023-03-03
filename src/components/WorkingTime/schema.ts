import dayjs from 'dayjs';
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
                      '無効な形式です。',
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
          }),
      }),
    )
    .required(),
});

export default schema;
export type WorkingTimeFormValues = InferType<typeof schema>;
