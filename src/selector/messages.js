import {createSelector} from 'reselect';
import {getRoomProp} from './rooms';
import {filter, findLastKey, get, map} from 'lodash';

export const getChatId = (state, props) => props.chatId;
export const getMessages = state => state.messages;

export const getMessage = (state, props) => state.messages[props.id];
export const getMessageProp = (state, props) => state.messages[props.id] ? get(state.messages[props.id], props.key) : null;
export const getRoomLastMessage = (state, props) => {
  const id = findLastKey(
    state.messages,
    {
      chatId: props.chatId || getRoomProp(state, {roomId: props.roomId, key: 'subscribe.chatId'}),
    },
  );
  return getMessage(state, {id});
};


export const getRoomMessages = createSelector(
  getMessages,
  getChatId,
  (messages, chatId) => map(
    filter(messages, {chatId}),
    'id',
  ),
);