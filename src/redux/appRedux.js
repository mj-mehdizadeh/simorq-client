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
  state: null, // CONNECTING, UPDATING, CONNECTED
};

/* ------------- Reducers ------------- */

export const setConfig = (state, config) => {
  return {...state, ...config};
};
export const setState = (state, newState) => {
  return {...state, state: newState};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CONFIG]: setConfig,
  [Types.SET_STATE]: setState,
});
