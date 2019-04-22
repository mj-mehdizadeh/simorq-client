import {storeDispatch} from '../../redux/configureStore';
import Creators from '../../redux/messages';
import {keyBy, map} from 'lodash';
import {getMe} from '../../utils/client';

export function putMessages(messages) {
  return storeDispatch(
    Creators.appendMessages(normalizeMessages(messages)),
  );
}

export function deleteMessage(id, chatId) {
  return storeDispatch(
    Creators.deleteMessage(id, chatId)
  );
}

/* ------------- Normalizer ------------- */

export function normalizeMessages(messages) {
  return keyBy(
    map(messages, normalizeMessage),
    'id',
  );
}

export function normalizeMessage(message) {
  return {
    ...message,
    out: message.roomId === getMe('roomId'),
  };
}
