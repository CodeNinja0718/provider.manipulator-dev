import jaLocale from 'locales/ja/index.json';
import { createTranslator } from 'next-intl';

// This creates the same function that is returned by `useTranslations`.
// Since there's no provider, you can pass all the properties you'd
// usually pass to the provider directly here.
const t = createTranslator({ locale: 'ja', messages: jaLocale });

export default t;
