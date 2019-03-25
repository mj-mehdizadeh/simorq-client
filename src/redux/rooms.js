import {createActions, createReducer} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  fetchRooms: null,
  appendRooms: ['rooms'],
  appendRoom: ['room'],
});

export const RoomsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {};

/* ------------- Reducers ------------- */

export const appendRooms = (state, action) => {
  return {...state, ...action.rooms};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APPEND_ROOMS]: appendRooms,
});
