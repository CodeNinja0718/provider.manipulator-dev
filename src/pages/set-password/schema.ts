import { Regex } from 'utils/const';
import type { InferType } from 'yup';
import { object, ref, string } from 'yup';

const schema = object({
  password: string()
    .required()
    .trim('空白文字は使用できません。')
    .strict(true)
    .matches(
      Regex.PASSWORD,
      '最低8文字\n小文字と大文字ともに1文字以上\n数字か記号のどちからを1文字以上',
    ),
  confirmPassword: string()
    .required()
    .trim('パスワードが一致しません。')
    .strict(true)
    .matches(Regex.PASSWORD, 'パスワードが一致しません。')
    .oneOf([ref('password')], 'パスワードが一致しません。'),
});

export default schema;
export type SetPasswordFormValues = InferType<typeof schema>;
