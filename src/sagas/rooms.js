import {call, put, take} from 'redux-saga/effects';
import Creators, {RoomsTypes} from '../redux/rooms';
import Api from '../services/api';
import {SUBSCRIBES} from '../constant/methods';
import {putMessages} from './messages';

import {keyBy, map} from 'lodash';
import {mkColor, mkInitials} from '../services/app';

/* ------------- Api ------------- */

const fetchRoomList = () => {
  return Api.get(SUBSCRIBES, null, {toastError: true});
};

/* ------------- Sags ------------- */

export function* getRoomList() {
  try {
    yield take(RoomsTypes.FETCH_ROOMS);
    const response = yield call(fetchRoomList);
    yield putRooms(response.rooms);
    yield putMessages(response.messages);
  } catch (error) {
  }
}

export function putRooms(rooms) {
  return put(
    Creators.appendRooms(
      keyBy(
        map(rooms, trimRoom),
        'id',
      ),
    ),
  );
}

/* ------------- Trim ------------- */

export function trimRoom(room) {
  const item = mkColor(room.id);
  return {
    ...room,
    avatar: {
      file: room.avatar,
      color: item[1],
      backgroundColor: item[0],
      initial: mkInitials(room.title),
    },
  };
}
