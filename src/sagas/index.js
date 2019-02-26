import {all, fork} from 'redux-saga/effects';
import {getRoomList} from './rooms';
import {getHistory, newMessage} from './messages';

export default function* root() {
  yield all([
    fork(getRoomList),
    fork(getHistory),
    fork(newMessage),
  ]);
}
