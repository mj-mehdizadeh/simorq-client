import {getRoomChatId} from './rooms';
import {findKey, get, head} from 'lodash';

export const getMessages = state => state.messages.storage;

export const getMessage = (state, id) => state.messages.storage[id];
export const getMessageProp = (state, props) => state.messages.storage[props.id] ? get(state.messages.storage[props.id], props.key) : null;
export const getRoomLastMessage = (state, props) => {
  const id = head(getRoomMessages(state, props));
  return getMessage(state, id);
};
export const getMessageIdByRandId = (state, randomId) => {
  return findKey(getMessages(state), message => message.randomId === randomId);
};

export const getRoomMessages = (state, props) => {
  const chatId = getRoomChatId(state, props);
  return state.messages.history[chatId] || [];
};
