import {createSelector} from 'reselect';
import {USER_ID} from '../constant/user';
import {getRoomProp} from './rooms';
import {filter, findLast, map, get} from 'lodash';

export const getChatId = (state, props) => props.chatId;
export const getMessages = state => state.messages;

export const getMessage = (state, props) => state.messages[props.id];
export const getMessageProp = (state, props) => state.messages[props.id] ? get(state.messages[props.id], props.key) : null;
export const getRoomLastMessage = (state, props) =>
  findLast(
    state.messages,
    {
      chatId: props.chatId || getRoomProp(state, {roomId: props.roomId, key: 'subscribe.chatId'}),
    },
  );

export const getRoomMessages = createSelector(
  getMessages,
  getChatId,
  (messages, chatId) => map(
    filter(messages, {chatId}),
    'id',
  ),
);