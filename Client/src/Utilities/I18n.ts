import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const pathPrefix = process.env.NODE_ENV === "production" ? "/Cloven" : "";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${pathPrefix}/locales/{{lng}}/{{ns}}.json`,
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    lng: "en",
  })
  .catch((error) => console.error(error));

export { i18next };
