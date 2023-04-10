import { MENU_TYPE } from 'utils/const';
import type { InferType } from 'yup';
import { array, boolean, number, object, string } from 'yup';

const schema = object({
  name: string().required(),
  order: number()
    .required()
    .min(1, 'Order must be between 1 and 100')
    .max(100, 'Order must be between 1 and 100'),
  estimatedTime: number()
    .required()
    .min(30, 'Duration must be between 30 and 240')
    .max(240, 'Duration must be between 30 and 240'),
  timeDisplay: boolean(),
  menuTypes: array().min(1),
  price: number().required().min(0, 'Price must be 0 or greater'),
  ticketMount: number()
    .required()
    // min validation when 'coupon' options is checked
    .when('menuTypes', (menuTypes, s) =>
      menuTypes.includes(MENU_TYPE[1]?.id)
        ? s.min(1, 'Ticket mount must be 1 or greater')
        : s,
    ),
  ticketPrice: number()
    .required()
    .when('menuTypes', (menuTypes, s) =>
      menuTypes.includes(MENU_TYPE[1]?.id)
        ? s.min(1, 'Ticket price must be 1 or greater')
        : s,
    ),
  couponExpirationDate: number()
    .required()
    .when('menuTypes', (menuTypes, s) =>
      menuTypes.includes(MENU_TYPE[1]?.id)
        ? s
            .min(1, 'Coupon expiration date must be between 1 and 12')
            .max(12, 'Coupon expiration date must be between 1 and 12')
        : s,
    ),
  status: string().required(),
  // availabelStaff: array().min(1),
});

export default schema;
export type MenuFormValues = InferType<typeof schema>;
