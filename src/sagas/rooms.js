import {put, take, call} from 'redux-saga/effects';
import Creators, {RoomsTypes} from '../redux/rooms';
import Api from '../services/api';
import {SUBSCRIBES} from '../constant/methods';
import {putMessages} from './messages';

import {keyBy, map} from 'lodash';
import {mkColor, mkInitials} from '../services/app';

/* ------------- Api ------------- */

const fetchRoomList = () => {
  return Api.get(SUBSCRIBES);
};

/* ------------- Sags ------------- */

export function* getRoomList() {
  try {
    yield take(RoomsTypes.FETCH_ROOMS);
    const response = yield call(fetchRoomList);
    yield putRooms(response.rooms);
    yield putMessages(response.messages);
  } catch (error) {
    yield put(Creators.failed());
  }
}

export function putRooms(rooms) {
  return put(
    Creators.appendRooms(
      keyBy(
        map(rooms, trimRoom),
        'id'
      )
    )
  );
}

/* ------------- Trim ------------- */

export function trimRoom(room) {
  return {
    ...room,
    avatar: {
      file: room.avatar,
      color: mkColor(room.id),
      initial: mkInitials(room.title),
    },
  };
}