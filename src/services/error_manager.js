import {Toast} from 'native-base';
import {Vibration} from 'react-native';
import {translate} from './i18n';
import {concat, forIn} from 'lodash';

export default class ErrorManager {
  static toast(error) {
    const messages = ErrorManager.getErrorMessages(error);
    messages.forEach(function(text) {
      Toast.show({
        text,
      });
      Vibration.vibrate(300);
    });
  }

  static getErrorMessages(error) {
    let messages = [];
    if (error.code) {
      if (error.code === 'unexpected_error') {
        messages.push(translate('error.checkConnection'));
      }
      if (error.code === 'invalid_param') {
        error.params.forEach((param) => {
          messages.push(translate(`error.${param.code}`, {field: translate(`field.${param.field}`)}));
        });
      }
      if (error.code === 'validate_error') {
        forIn(error.params, function(value, key) {
          messages = concat(messages, value);
        });
      }
    } else if (error instanceof Error) {
      messages.push(error.message);
    }
    return messages;
  }
}
