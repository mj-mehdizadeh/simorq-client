import {all, fork} from 'redux-saga/effects';
import {getContacts} from './contacts';

export default function* root() {
  yield all([
    fork(getContacts),
  ]);
}
