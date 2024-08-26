import i18next from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next"

i18next.use(languageDetector).use(initReactI18next).init({
  debug:true,
  lng:"en"
})