import {createSelector} from 'reselect';
import {filter, get, map} from 'lodash';

export const getRooms = state => state.rooms;
export const getRoom = (state, roomId) => get(state.rooms, roomId);

export const getRoomProp = (state, props) => {
  const room = getRoom(state, props.roomId);
  return room ? get(room, props.key) : null;
};
export const getRoomChatId = (state, props) => {
  return props.chatId || getRoomProp(state, {roomId: props.roomId, key: 'subscribe.chatId'});
};

export const getRoomList = createSelector(
  getRooms,
  rooms => map(
    filter(rooms, 'subscribe'),
    'id',
  ),
);
