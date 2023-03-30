import dayjs from 'dayjs';
import type { InferType } from 'yup';
import { object, string } from 'yup';

const parseTimeSlot = (time: string | undefined) => {
  const timeSplit = time?.split(':');
  if (timeSplit) {
    return dayjs().hour(Number(timeSplit[0])).minute(Number(timeSplit[1]));
  }
  return dayjs();
};
const schema = object({
  manipulatorId: string().required(),
  customerName: string(),
  menuId: string().required(),
  // couponId: string(),
  date: string().required(),
  startTime: string()
    .test('is-end-time-after-start', '無効な形式です。', (value, context) => {
      const { parent } = context;
      if (!value || !parent.endTime) {
        return true;
      }
      const endTime = parseTimeSlot(parent.endTime);
      const startTime = parseTimeSlot(value);
      return endTime.diff(startTime, 'minute') > 0;
    })
    .required(),
  endTime: string()
    .test('is-end-time-after-start', '無効な形式です。', (value, context) => {
      const { parent } = context;
      if (!value || !parent.startTime) {
        return true;
      }
      const startTime = parseTimeSlot(parent.startTime);
      const endTime = parseTimeSlot(value);
      return endTime.diff(startTime, 'minute') > 0;
    })
    .required(),
  // quantity: number().min(0, 'Must be 0 or greater'),
});

export default schema;
export type RegistrationFormValues = InferType<typeof schema>;
