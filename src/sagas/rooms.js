import {put, take, call} from 'redux-saga/effects';
import Creators, {RoomsTypes} from '../redux/rooms';
import Api from '../services/api';
import {SUBSCRIBES} from '../constant/methods';

const fetchRoomList = () => {
  return Api.get(SUBSCRIBES);
};

export function* getRoomList() {
  try {
    yield take(RoomsTypes.GET_ROOM_LIST);
    const rooms = yield call(fetchRoomList);
    yield put(Creators.addRoomList(rooms));
  } catch (error) {
    yield put(Creators.failed());
  }
}
