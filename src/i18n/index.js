import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './en';
import ru from './ru';
import ua from './ua';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'ru', 'ua'];

const options = {
  // order and from where user language should be detected
  order: ['localStorage', 'navigator'],
  lookupLocalStorage: 'entry-task-app-language',
  // cache user language on
  caches: ['localStorage'],
  // only detect languages that are in the whitelist
  checkWhitelist: true
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    whitelist: availableLanguages,
    detection: options,
    resources: { en, ru, ua },
    interpolation: { escapeValue: false },
  });

export default i18n;
