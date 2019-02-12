import {getRoomChatId} from './rooms';
import {get, head} from 'lodash';

export const getMessages = state => state.messages.storage;

export const getMessage = (state, props) => state.messages.storage[props.id];
export const getMessageProp = (state, props) => state.messages.storage[props.id] ? get(state.messages.storage[props.id], props.key) : null;
export const getRoomLastMessage = (state, props) => {
  const id = head(getRoomMessages(state, props));
  return getMessage(state, {id});
};

export const getRoomMessages = (state, props) => {
  const chatId = getRoomChatId(state, props);
  return state.messages.history[chatId] || [];
};