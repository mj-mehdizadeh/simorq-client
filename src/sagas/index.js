import {all, fork} from 'redux-saga/effects';
import {getRoomList} from './rooms';

export default function* root() {
  yield all([
    fork(getRoomList),
  ]);
}
