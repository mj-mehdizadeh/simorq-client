import Api from '../utils/api';
import {ROOMS_FIND, SUBSCRIBES} from '../constant/methods';
import {storeDispatch} from '../redux/configureStore';
import Creators from '../redux/rooms';
import {keyBy, map} from 'lodash';
import {mkColor, mkInitials} from '../utils/app';
import {putMessages} from './messages/dispatcher';

/* ------------- Api ------------- */

export async function fetchRoom(id) {
  const response = await Api.get(ROOMS_FIND, {id}, {toastError: true});
  putRooms(response.rooms);
  putMessages(response.messages);
}

export async function fetchSubscribes() {
  const response = await Api.get(SUBSCRIBES, null, {toastError: true});
  putRooms(response.rooms);
  putMessages(response.messages);
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
