import {createSelector} from 'reselect';
import {filter, map, findLast} from 'lodash';
import {USER_ID} from '../constant/user';

export const getChatId = (state, props) => props.chatId;
export const getMessages = state => state.messages;

export const getMessage = (state, props) => state.messages[props.id];
export const getMessageProps = (state, props) => state.messages[props.id] ? state.messages[props.id][props.key] : null;
export const getRoomLastMessage = (state, props) => findLast(state.messages, {chatId: props.chatId});

export const getRoomMessages = createSelector(
  getMessages,
  getChatId,
  (messages, chatId) => map(
    filter(messages, {chatId}),
    'id',
  ),
);

export function fettleMessage(message) {
  return {
    ...message,
    out: message.createdBy === USER_ID,
  };
}
