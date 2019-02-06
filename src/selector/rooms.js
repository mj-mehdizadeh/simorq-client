import {createSelector} from 'reselect';
import {filter, get, map} from 'lodash';

export const getRooms = state => state.rooms;
export const getRoom = (state, props) => get(state.rooms, props.roomId);

export const getRoomProp = (state, props) => {
  const room = getRoom(state, props);
  return room ? get(room, props.key) : null;
};

export const getRoomList = createSelector(
  getRooms,
  rooms => map(
    filter(rooms, 'subscribe'),
    'id',
  ),
);
