import {createActions, createReducer} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setConfig: ['config'],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  state: null,
};

/* ------------- Reducers ------------- */

export const setConfig = (state, config) => {
  return {...state, ...config};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CONFIG]: setConfig,
});
