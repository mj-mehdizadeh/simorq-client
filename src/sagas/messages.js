import {call, put, takeEvery} from 'redux-saga/effects';
import Creators, {MessagesTypes} from '../redux/messages';

import {keyBy, map} from 'lodash';
import {USER_ID} from '../constant/user';
import Api from '../services/api';
import {MESSAGES} from '../constant/methods';
import {HISTORY_PAGINATION} from '../constant/app';

/* ------------- CONSTANT ------------- */
const _END_OF_SCROLL = {};
/* ------------- Api ------------- */

const fetchHistory = (roomId, from, direction) => {
  return Api.get(MESSAGES, {roomId, from, direction, limit: HISTORY_PAGINATION}, {toastError: true});
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
        'id'
      )
    )
  );
}

/* ------------- Trim ------------- */

export function TrimMessage(message) {
  return {
    ...message,
    out: message.createdBy === USER_ID,
  };
}
