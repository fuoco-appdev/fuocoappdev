import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import English from './assets/strings/en.json';
import French from './assets/strings/fr.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: English,
      },
      fr: {
        translation: French,
      },
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

moment.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: number => number + "s ago",
    ss: '%ds ago',
    m: "1m ago",
    mm: "%dm ago",
    h: "1h ago",
    hh: "%dh ago",
    d: "1d ago",
    dd: "%dd ago",
    M: "a month ago",
    MM: "%d months ago",
    y: "a year ago",
    yy: "%d years ago"
  }
});

export default i18n;
