import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// translations
import langUz from './locales/uz';
import langRu from './locales/ru';
import langEn from './locales/en';

// Default Lang
export const defLang = 'uz';
const fallbackLang = 'en';

// Function to init our configs for all languages
i18next.use(initReactI18next).init({
  resources: {
    uz: { translation: langUz },
    ru: { translation: langRu },
    en: { translation: langEn }
  },
  lng: defLang,
  fallbackLng: fallbackLang
});

export const changeLang = (value) => {
  i18next.changeLanguage(value);
  localStorage.setItem('lang', value);
};
