import i18n from 'i18next';
import {reactI18nextModule} from 'react-i18next';
import {LOCALE_EN, LOCALE_FA, LOCALES} from '../constant/locale';
import {I18nManager} from 'react-native';
import {retrieveData, storeData} from './storage';
import RNRestart from 'react-native-restart'; // Import package from node modules

const LANGUAGE_STORE_KEY = 'userLang';

i18n
  .use(reactI18nextModule)
  .init({
    fallbackLng: LOCALE_EN,
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

export function changeLang(lang) {
  i18n.changeLanguage(lang, (e, t) => {
    if (!e) {
      I18nManager.forceRTL(LOCALES[lang].rtl);
      storeData(LANGUAGE_STORE_KEY, lang);
      RNRestart.Restart();
    }
  });
}

export async function loadUserLang() {
  try {
    let _lang = await retrieveData(LANGUAGE_STORE_KEY);
    i18n.changeLanguage(_lang);
  } catch (e) {
  }
}
