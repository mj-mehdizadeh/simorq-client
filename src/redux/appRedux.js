import {createActions, createReducer} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setConfig: ['config'],
  setState: ['state'],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  state: 'CONNECTING', // CONNECTING, UPDATING, CONNECTED
};

/* ------------- Reducers ------------- */

export const setConfig = (state, action) => {
  return {...state, ...action.config};
};
export const setState = (state, action) => {
  return {...state, state: action.state};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CONFIG]: setConfig,
  [Types.SET_STATE]: setState,
});
