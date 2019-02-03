import {Toast} from 'native-base';
import {Vibration} from 'react-native';
import {translate} from '../i18n';
import {INVALID_PARAM_ERROR, UNAUTHORIZED_ERROR, UNKNOWN_ERROR, VALIDATE_ERROR} from '../../constant/errors';
import {AUTH_NAVIGATOR} from '../../constant/navigator';
import {navigate} from '../navigator';
import OAuth from '../oauth';

export default class ErrorManager {
  static async onError(error) {
    switch (error.name) {
      case UNAUTHORIZED_ERROR:
        await OAuth.removeToken();
        navigate(AUTH_NAVIGATOR);
        break;
    }
  }

  static toast(error) {
    const messages = this.getErrorMessages(error);
    if (typeof messages === 'string') {
      this.showToast(messages);
    } else {
      messages.forEach((text) => {
        this.showToast(text);
      });
    }
  }

  static showToast(text) {
    if (text) {
      Toast.show({
        text,
      });
    }
    Vibration.vibrate(300);
  }

  static getErrorMessages(error) {
    switch (error.name) {
      case UNKNOWN_ERROR:
        return translate('error.checkConnection');
      case INVALID_PARAM_ERROR:
        return error.params.map((param) => {
          return translate(`error.${param.name}`, {field: translate(`field.${param.field}`)});
        });
      case VALIDATE_ERROR:
        return;
      default:
        return translate(`error.${error.name}`) || error.name;
    }
  }
}
