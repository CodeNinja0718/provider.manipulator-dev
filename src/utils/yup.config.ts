import * as yup from 'yup';
import type { LocaleObject } from 'yup/lib/locale';

import t from './translator';

export const customLocale: LocaleObject = {
  mixed: {
    required: () => t('validation.requiredField'),
  },
};

yup.setLocale(customLocale);

export default yup;
