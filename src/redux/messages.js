import {createActions, createReducer} from 'reduxsauce';
import {concat, forIn, groupBy, indexOf, map, reverse, sortBy, sortedUniq} from 'lodash';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  fetchHistory: ['roomId', 'from', 'direction'],
  appendMessages: ['messages'],
  deleteMessage: ['id', 'chatId'],
  newMessage: ['message', 'params'],
});

export const MessagesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  storage: {},
  history: {},
};

/* ------------- Reducers ------------- */

export const appendMessages = (state, action) => {
  const newHistory = {...state.history};
  forIn(groupBy(action.messages, 'chatId'), (messages, chatId) => {
    newHistory[chatId] = reverse(sortedUniq(sortBy(
      concat(
        newHistory[chatId] || [],
        map(messages, 'id'),
      ),
    )));
  });
  return {
    storage: {...state.storage, ...action.messages},
    history: newHistory,
  };
};

export const deleteMessage = (state, action) => {

  const storage = {...state.storage};
  const history = {...state.history};
  delete storage[action.id];

  if (history[action.chatId]) {
    const roomHistory = history[action.chatId];
    const index = indexOf(roomHistory, action.id);
    roomHistory.splice(index, 1);
    history[action.chatId] = [...roomHistory];
  }
  return {
    storage,
    history,
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APPEND_MESSAGES]: appendMessages,
  [Types.DELETE_MESSAGE]: deleteMessage,
});
