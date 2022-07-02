import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import languageDetector from "./language-detector";
import dayjs from "utils/dayjs";

import ms from "./lang/vi";
import en from "./lang/en";

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      ms,
    },
    supportedLngs: ["en", "vi"],
    fallbackLng: ["en", "vi"],
    defaultNS: "common",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("loaded", () => {
  console.log("i18n initialized ", i18n.language);
});

i18n.on("languageChanged", (lng) => {
  dayjs.locale(`${lng}`);
});

export default i18n;
