import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './assets/locales/en/mobile.json';
import pl from './assets/locales/pl/mobile.json';

const resources = {
   en: {
      translation: en,
   },
   pl: {
      translation: pl,
   },
};

declare module 'i18next' {
   interface CustomTypeOptions {
      returnNull: false;
   }
}

i18n.use(initReactI18next).init({
   compatibilityJSON: 'v3',
   resources,
   lng: Localization.locale.slice(0, 2),
   fallbackLng: 'pl',
   returnNull: false,
});

export default i18n;
