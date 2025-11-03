import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

const supportedLngs = ["ru", "en"];

i18next
  .use(LanguageDetector)
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    supportedLngs,
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
    backend: {
      loadPath: `${
        import.meta.env.BASE_URL || ""
      }/locales/{{lng}}/translations.json`,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "__language__",
      convertDetectedLanguage: (lng) => {
        const baseLang = lng.split("-")[0].toLowerCase();
        return supportedLngs.includes(baseLang) ? baseLang : "ru";
      },
    },
  });

i18next.on("languageChanged", (lng) => {
  localStorage.setItem("__language__", lng);
});

export default i18next;
