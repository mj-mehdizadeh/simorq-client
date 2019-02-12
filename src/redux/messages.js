import {createActions, createReducer} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  fetchHistory: ['roomId', 'from', 'direction'],
  appendMessages: ['messages'],
});

export const MessagesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {};

/* ------------- Reducers ------------- */

export const appendMessages = (state, action) => {
  return {...state, ...action.messages};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APPEND_MESSAGES]: appendMessages,
});
