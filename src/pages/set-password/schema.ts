import { Regex } from 'utils/const';
import type { InferType } from 'yup';
import { object, ref, string } from 'yup';

const schema = object({
  password: string()
    .required()
    .trim('空白文字は使用できません。')
    .strict(true)
    .matches(Regex.PASSWORD, '無効な形式です。'),
  confirmPassword: string()
    .required()
    .trim('空白文字は使用できません。')
    .strict(true)
    .matches(Regex.PASSWORD, '無効な形式です。')
    .oneOf([ref('password')], 'パスワードが一致しません。'),
});

export default schema;
export type SetPasswordFormValues = InferType<typeof schema>;
