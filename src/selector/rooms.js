import {createSelector} from 'reselect';
import {filter, map, get} from 'lodash';

export const getRooms = state => state.rooms;
export const getRoom = (state, props) => state.rooms[props.roomId];
export const getRoomProp = (state, props) => state.rooms[props.roomId] ? get(state.rooms[props.roomId], props.key) : null;

export const getRoomList = createSelector(
  getRooms,
  rooms => map(
    filter(rooms, 'subscribe'),
    'id',
  ),
);
