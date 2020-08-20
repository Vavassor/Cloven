import { Dispatch, useEffect } from "react";
import { ThemeAction } from "../../Contexts/ThemeContext";
import { setLayoutDirection } from "../../Contexts/ThemeDispatch";
import { LayoutDirection } from "../../Types/Theme";
import { i18next } from "../I18n";
import { parseLanguageTag } from "../LanguageTag";

const rtlLanguages = [
  "ae", // Avestan
  "ar", // 'العربية', Arabic
  "arc", // Aramaic
  "bcc", // 'بلوچی مکرانی', Southern Balochi
  "bqi", // 'بختياري', Bakthiari
  "ckb", // 'Soranî / کوردی', Sorani
  "dv", // Dhivehi
  "fa", // 'فارسی', Persian
  "glk", // 'گیلکی', Gilaki
  "he", // 'עברית', Hebrew
  "ku", // 'Kurdî / كوردی', Kurdish
  "mzn", // 'مازِرونی', Mazanderani
  "nqo", // N'Ko
  "pnb", // 'پنجابی', Western Punjabi
  "ps", // 'پښتو', Pashto
  "sd", // 'سنڌي', Sindhi
  "ug", // 'Uyghurche / ئۇيغۇرچە', Uyghur
  "ur", // 'اردو', Urdu
  "xb", // RTL pseudolocale
  "yi", // 'ייִדיש', Yiddish
];

export const useLocaleSetup = (themeDispatch: Dispatch<ThemeAction>) => {
  useEffect(() => {
    const handleChangeLanguage = (language: string) => {
      const languageTag = parseLanguageTag(language);
      if (languageTag) {
        let direction = "ltr";
        let layoutDirection = LayoutDirection.LTR;
        if (rtlLanguages.includes(languageTag.language)) {
          direction = "rtl";
          layoutDirection = LayoutDirection.RTL;
        }
        const { documentElement } = document;
        documentElement.dir = direction;
        documentElement.lang = language;
        themeDispatch(setLayoutDirection(layoutDirection));
      }
    };

    i18next.on("initialized", (options) => {
      const language = options.lng;
      if (language) {
        handleChangeLanguage(language);
      }
    });

    i18next.on("languageChanged", (language) => {
      handleChangeLanguage(language);
    });

    return () => {
      i18next.off("initialized");
      i18next.off("languageChanged");
    };
  }, [themeDispatch]);
};
