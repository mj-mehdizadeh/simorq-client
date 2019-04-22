import {call, put, takeEvery} from 'redux-saga/effects';
import Creators, {RoomsTypes} from '../redux/rooms';
import Api from '../utils/api';
import {ROOMS_FIND, SUBSCRIBES} from '../constant/methods';
import {putMessages} from './messages';

import {keyBy, map} from 'lodash';
import {mkColor, mkInitials} from '../utils/app';
import AppCreators from '../redux/appRedux';

/* ------------- Api ------------- */

const fetchRoomList = () => {
  return Api.get(SUBSCRIBES, null, {toastError: true}).catch(err => []);
};

const fetchRoom = (id) => {
  return Api.get(ROOMS_FIND, {id}, {toastError: true}).catch(err => []);
};

/* ------------- Sags ------------- */

export function* getRoom() {
  yield takeEvery(RoomsTypes.FETCH_ROOM, takeRoomList);
}

export function* getRoomList() {
  yield takeEvery(RoomsTypes.FETCH_ROOMS, takeRoomList);
}

export function* takeRoomList(action) {
  action.changeState ? yield (put(AppCreators.setState('UPDATING'))) : null;
  const response = yield call(action.roomId ? fetchRoom : fetchRoomList, action.roomId);
  yield putRooms(response.rooms);
  yield putMessages(response.messages);
  action.changeState ? yield (put(AppCreators.setState('CONNECTED'))) : null;
}

export function* appendRoom() {
  yield takeEvery(RoomsTypes.APPEND_ROOM, takeAppendRoom);
}

export function* takeAppendRoom(action) {
  yield putRooms([action.room]);
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
      ...room.avatar,
      color: item[1],
      backgroundColor: item[0],
      initial: mkInitials(room.title),
    },
  };
}
