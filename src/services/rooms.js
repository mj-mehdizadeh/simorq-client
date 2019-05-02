import Api from '../utils/api';
import {ROOMS_FIND, SUBSCRIBES} from '../constant/methods';
import {storeDispatch} from '../redux/configureStore';
import Creators from '../redux/rooms';
import {keyBy, map} from 'lodash';
import {mkColor, mkInitials} from '../utils/app';
import {putMessages} from './messages/dispatcher';

/* ------------- Api ------------- */

export async function fetchRoom(params) {
  const response = await Api.get(ROOMS_FIND, params, {toastError: true});
  putRooms(response.rooms);
  putMessages(response.messages);
}

export async function fetchSubscribes() {
  const response = await Api.get(SUBSCRIBES, null, {toastError: true});
  putRooms(response.rooms);
  putMessages(response.messages);
}

export async function fetchRoomByIds(roomIds) {
  const response = await Api.get(ROOMS_FIND, {roomIds: JSON.stringify(roomIds)}, {toastError: true});
  putRooms(response);
}
/* ------------- Dispatcher ------------- */

export function putRooms(rooms) {
  storeDispatch(Creators.appendRooms(
    keyBy(
      map(rooms, normalize),
      'id',
    ),
  ));
}

/* ------------- Normalizer ------------- */

export function normalize(room) {
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
