import {call, put, takeEvery} from 'redux-saga/effects';
import Creators, {MessagesTypes} from '../redux/messages';
import RoomCreators from '../redux/rooms';

import {keyBy, map} from 'lodash';
import Api from '../services/api';
import {MESSAGE_NEW, MESSAGES} from '../constant/methods';
import {HISTORY_PAGINATION} from '../constant/app';
import {getMe} from '../services/client';
import {getRoomByChatId} from '../selector/rooms';
import {getStoreState, storeDispatch} from '../redux/configureStore';
import {getMessageIdByRandId} from '../selector/messages';

/* ------------- CONSTANT ------------- */
const _END_OF_SCROLL = {};
/* ------------- Api ------------- */

const fetchHistory = (roomId, from, direction) => {
  return Api.get(MESSAGES, {roomId, from, direction, limit: HISTORY_PAGINATION}, {toastError: true});
};

const postNewMessage = (params) => {
  return Api.post(MESSAGE_NEW, params, {toastError: true});
};

/* ------------- Sags ------------- */

export function* getHistory() {
  yield takeEvery(MessagesTypes.FETCH_HISTORY, takeHistory);
}

export function* takeHistory(action) {
  try {
    if (_END_OF_SCROLL[action.roomId]) {
      return;
    }
    const messages = yield call(fetchHistory, action.roomId, action.from, action.direction);
    _END_OF_SCROLL[action.roomId] = !messages.length;
    yield putMessages(messages);
  } catch (error) {
  }
}

export function putMessages(messages) {
  return put(
    Creators.appendMessages(normalizeMessages(messages)),
  );
}

export function* newMessage() {
  yield takeEvery(MessagesTypes.NEW_MESSAGE, takeNewMessage);
}

export function* takeNewMessage(action) {
  try {
    yield putMessages([action.message]);
    if (action.params) {
      const message = yield call(postNewMessage, {
        room_id: action.params.roomId,
        random_id: action.message.randomId,
        text: action.message.text,
      });
      yield put(Creators.deleteMessage(action.message.id, message.chatId));
      yield putMessages([message]);
    }
  } catch (e) {
    yield put(Creators.editMessage(action.message.id, {failed: true}));
  }
}

/* ------------- Events ------------- */

export async function onNewMessage(message) {
  const messageId = getMessageIdByRandId(getStoreState(), message.randomId);
  if (messageId && messageId !== message.id) {
    return;
  }
  const room = getRoomByChatId(getStoreState(), message.chatId);
  if (!room) {
    // todo getRoom by chatId
    await storeDispatch(RoomCreators.fetchRoom(message.roomId));
  }
  storeDispatch(Creators.appendMessages(normalizeMessages([message])));
}

/* ------------- Normalize ------------- */

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
