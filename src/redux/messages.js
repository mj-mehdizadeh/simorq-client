import {createActions, createReducer} from 'reduxsauce';
import {forIn, reverse, groupBy, sortBy, concat, map, sortedUniq} from 'lodash';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  fetchHistory: ['roomId', 'from', 'direction'],
  appendMessages: ['messages'],
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
        map(messages, 'id')
      )
    )));
  });
  return {
    storage: {...state.storage, ...action.messages},
    history: newHistory,
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APPEND_MESSAGES]: appendMessages,
});
