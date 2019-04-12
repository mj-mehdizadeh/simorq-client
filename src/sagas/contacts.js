import {put, takeEvery} from 'redux-saga/effects';
import Creators, {ContactsTypes} from '../redux/contacts';
import {putRooms} from './rooms';

/* ------------- Api ------------- */


/* ------------- Sags ------------- */

export function* getContacts() {
  yield takeEvery(ContactsTypes.CONTACTS_RESPONSE, takeContactsList);
}

export function* takeContactsList(action) {
  yield putRooms(action.response.rooms);
  yield put(Creators.appendContacts(action.response.contacts));
}

/* ------------- Normalizer ------------- */
