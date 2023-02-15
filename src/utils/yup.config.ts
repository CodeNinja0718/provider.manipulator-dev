import * as yup from 'yup';
import type { LocaleObject } from 'yup/lib/locale';

export const customLocale: LocaleObject = {
  mixed: {
    required: () => 'この項目は入力必須です。',
  },
};

yup.setLocale(customLocale);

export default yup;
