import {createSelector} from 'reselect';
import {map, filter} from 'lodash';

export const getContacts = state => state.contacts;
export const getContactsRooms = createSelector(
  getContacts,
  contacts => map(filter(contacts, 'roomId'), 'roomId')
);
