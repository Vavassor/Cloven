/**
 * Internationalization is abbreviated to the numeronym "i18n", where 18 stands
 * for the number of letters between the first i and the last n in the word
 * internationalization.
 */
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const pathPrefix =
  process.env.REACT_APP_IS_STORYBOOK_BUILD === "true" ? "/Cloven" : "";

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
