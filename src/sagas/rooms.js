import {put, take, call} from 'redux-saga/effects';
import Creators, {RoomsTypes} from '../redux/rooms';
import MessageCreators from '../redux/messages';
import Api from '../services/api';
import {SUBSCRIBES} from '../constant/methods';
import {keyBy} from 'lodash';
import {fettleMessage} from '../selector/messages';

const fetchRoomList = () => {
  return Api.get(SUBSCRIBES);
};

export function* getRoomList() {
  try {
    yield take(RoomsTypes.FETCH_ROOMS);
    const response = yield call(fetchRoomList);
    yield put(Creators.appendRooms(keyBy(response.rooms, 'id')));
    yield put(MessageCreators.appendMessages(
      keyBy(fettleMessage(response.messages), 'id')
    ));
  } catch (error) {
    yield put(Creators.failed());
  }
}
