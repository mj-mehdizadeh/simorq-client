import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {map, uniqBy, sortBy} from 'lodash';
import md5 from 'md5';
import Api from './api';
import {CHECK_CONTACTS} from '../constant/methods';

export async function getAllContacts() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    {
      'title': 'Contacts',
      'message': 'This app would like to view your contacts.',
    },
  );
  return new Promise((resolve, reject) => {
    Contacts.getAllWithoutPhotos((err, contacts) => {
      if (err !== 'denied') {
        return resolve(prettifyContacts(contacts));
      }
      reject(err);
    });
  });
}

function prettifyContacts(contacts) {
  const allContacts = [];
  map(contacts, contact => {
    map(contact.phoneNumbers, phoneNumber => {
      const title = [
        (contact.givenName || ''),
        (contact.middleName || ''),
        (contact.familyName || ''),
      ].join(' ').replace(/\s+/g, ' ').trim();
      allContacts.push({
        title,
        phone_number: phoneNumber.number.replace(/[^A-Z0-9]+/ig, ''),
      });
    });
  });
  return sortBy(uniqBy(allContacts, 'phone_number'), 'phone_number');
}

export async function importAllContacts(forceUpdate = false) {
  const contacts = await getAllContacts();
  const phoneNumbers = map(contacts, 'phone_number').join();
  const contactsHash = md5(phoneNumbers);
  const {equal} = await Api.post(CHECK_CONTACTS, {contactsHash});
  if (!equal || forceUpdate) {
    // dispatch get Api contacts
    // check difrence
    // upload difrence
  }
}
