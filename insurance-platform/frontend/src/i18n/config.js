import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import roTranslations from './ro.json';
import enTranslations from './en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ro: { translation: roTranslations },
      en: { translation: enTranslations },
    },
    lng: localStorage.getItem('language') || 'ro',
    fallbackLng: 'ro',
    interpolation: { escapeValue: false },
  });

export default i18n;
