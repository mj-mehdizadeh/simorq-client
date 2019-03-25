import {all, fork} from 'redux-saga/effects';
import {appendRoom, getRoomList} from './rooms';
import {getHistory, newMessage} from './messages';

export default function* root() {
  yield all([
    fork(getRoomList),
    fork(appendRoom),
    fork(getHistory),
    fork(newMessage),
  ]);
}
