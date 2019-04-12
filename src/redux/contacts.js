import {createActions, createReducer} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  contactsResponse: ['response'],
  appendContacts: ['contacts'],
});

export const ContactsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = [];

/* ------------- Reducers ------------- */

export const appendContacts = (state, action) => {
  return [...state, ...action.contacts];
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APPEND_CONTACTS]: appendContacts,
});
