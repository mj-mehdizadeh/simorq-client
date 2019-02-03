import {put, take, call} from 'redux-saga/effects';
import Creators, {MessagesTypes} from '../redux/messages';

import {map, keyBy} from 'lodash';
import {USER_ID} from '../constant/user';

/* ------------- Api ------------- */

/* ------------- Sags ------------- */

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
