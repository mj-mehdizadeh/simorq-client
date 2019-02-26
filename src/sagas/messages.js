import {call, put, takeEvery} from 'redux-saga/effects';
import Creators, {MessagesTypes} from '../redux/messages';

import {keyBy, map} from 'lodash';
import Api from '../services/api';
import {MESSAGE_NEW, MESSAGES} from '../constant/methods';
import {HISTORY_PAGINATION} from '../constant/app';
import {getMe} from '../services/client';

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
    Creators.appendMessages(
      keyBy(
        map(messages, TrimMessage),
        'id',
      ),
    ),
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
  }

}

/* ------------- Trim ------------- */

export function TrimMessage(message) {
  return {
    ...message,
    out: message.createdBy === getMe('id'),
  };
}
