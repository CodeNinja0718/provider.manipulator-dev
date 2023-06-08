import { MENU_TYPE } from 'utils/const';
import type { InferType } from 'yup';
import { array, boolean, number, object, string } from 'yup';

const schema = object({
  name: string().max(100, 'Order must be between 1 and 255').required(),
  order: number()
    .required()
    .min(1, 'Order must be between 1 and 100')
    .max(100, 'Order must be between 1 and 100'),
  estimatedTime: number()
    .required('目安時間は必須です')
    .min(30, 'Duration must be between 30 and 240')
    .max(240, 'Duration must be between 30 and 240'),
  timeDisplay: boolean(),
  menuTypes: array()
    .required('メニュー種別は必須です。')
    .min(1, 'Please select at least 1 menu type'),
  price: number()
    .required('単発料金は必須です。')
    .min(0, 'Price must be 0 or greater'),
  ticketMount: number()
    .required()
    // min validation when 'coupon' options is checked
    .when('menuTypes', (menuTypes, s) =>
      menuTypes.includes(MENU_TYPE[1]?.id)
        ? s.min(1, 'Ticket amount must be 1 or greater')
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
    .required('回数券の有効期限は必須です。')
    .when('menuTypes', (menuTypes, s) =>
      menuTypes.includes(MENU_TYPE[1]?.id)
        ? s
            .min(1, 'Coupon expiration months must be more than 0')
            .max(6, 'Coupon expiration months must not be greater than 6')
        : s,
    ),
  status: string().required(),
  availableStaff: array()
    .of(string())
    .required('この項目は入力必須です。')
    .min(1, 'この項目は入力必須です。'),
});

export default schema;
export type MenuFormValues = InferType<typeof schema>;
