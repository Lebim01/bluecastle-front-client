import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import en from "@/utils/translations/en.json";
import es from "@/utils/translations/es.json";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    ns1: en,
  },
  es: {
    ns1: es,
  },
};

i18n.use(initReactI18next).init({
  detection: {
    order: ["localStorage"],
    lookupLocalStorage: "i18nextLng",
    caches: ["localStorage"],
  },
  supportedLngs: ["es", "en"],
  ns: ["ns1"],
  resources,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});
