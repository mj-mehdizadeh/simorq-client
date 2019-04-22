import {all, fork} from 'redux-saga/effects';
import {appendRoom, getRoom, getRoomList} from './rooms';
import {getContacts} from './contacts';

export default function* root() {
  yield all([
    fork(getRoomList),
    fork(appendRoom),
    fork(getRoom),
    fork(getContacts),
  ]);
}
