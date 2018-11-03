import i18n from 'i18next';
import {reactI18nextModule} from 'react-i18next';
import {LOCALE_DEFAULT, LOCALE_EN, LOCALE_FA} from '../constant/locale';
import {retrieveData, storeData} from './storage';

const LANGUAGE_STORE_KEY = 'userLang';

i18n
  .use(reactI18nextModule)
  .init({
    fallbackLng: LOCALE_DEFAULT,
    debug: true,
    resources: {
      [LOCALE_EN]: {
        translation: require('../translations/en'),
      },
      [LOCALE_FA]: {
        translation: require('../translations/fa-IR'),
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
    },
  });

export default i18n;

export function changeLang(lang, store = true) {
  i18n.changeLanguage(lang, (e, t) => {
    if (!e) {
      // I18nManager.forceRTL(LOCALES[lang].rtl);
      if (store) {
        storeData(LANGUAGE_STORE_KEY, lang);
        // RNRestart.Restart();
      }
    }
  });
}

export async function loadUserLang() {
  let _lang = await retrieveData(LANGUAGE_STORE_KEY) || LOCALE_DEFAULT;
  changeLang(_lang, false);
}
