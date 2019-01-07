import {createActions, createReducer} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getRoomList: null,
  addRoomList: ['rooms'],
  failed: null,
});

export const RoomsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  loading: false,
  rooms: {},
};

/* ------------- Reducers ------------- */

export const getRoomList = (state, action) => {
  return {...state, loading: true};
};
export const addRoomList = (state, action) => {
  return {loading: false, rooms: {...state.rooms, ...action.rooms}};
};
export const failed = (state, action) => {
  return {...state, loading: false};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ROOM_LIST]: getRoomList,
  [Types.ADD_ROOM_LIST]: addRoomList,
  [Types.FAILED]: failed,
});
