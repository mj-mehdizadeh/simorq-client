import {getStoreState, storeDispatch} from '../../redux/configureStore';
import Creators from '../../redux/messages';
import {keyBy, map, uniq} from 'lodash';
import {getMe} from '../../utils/client';
import {getRoom} from '../../selector/rooms';
import {fetchRoomByIds} from '../rooms';

export function putMessages(messages, check = true) {
  if (check) {
    checkMessagesRoom(messages);
  }
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

export async function checkMessagesRoom(messages) {
  const roomIds = [];
  messages.forEach(message => {
    if (message.roomId && !getRoom(getStoreState(), message.roomId)) {
      roomIds.push(message.roomId);
    }
  });
  if (roomIds.length) {
    await fetchRoomByIds(uniq(roomIds));
  }
}
