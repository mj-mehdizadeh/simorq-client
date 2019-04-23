import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {differenceBy, map, sortBy, uniqBy} from 'lodash';
import md5 from 'md5';
import Api from '../utils/api';
import {CHECK_CONTACTS, GET_CONTACTS, IMPORT_CONTACTS} from '../constant/methods';
import {getStoreState, storeDispatch} from '../redux/configureStore';
import ContactsCreators from '../redux/contacts';
import {END_OF_CONTACTS} from '../constant/errors';

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
        return resolve(normalizeContacts(contacts));
      }
      reject(err);
    });
  });
}

export async function importContact(contact) {
  await Api.post(IMPORT_CONTACTS, {contacts: [contact]}, {toastError: true});
}

export async function importAllContacts(forceUpdate = false) {
  const contacts = await getAllContacts();
  const phoneNumbers = map(contacts, 'phone_number').join();
  const contactsHash = md5(phoneNumbers);
  const {equal} = await Api.post(CHECK_CONTACTS, {contactsHash});
  if (!equal || forceUpdate) {
    await fetchAllContacts();
    const difference = differenceBy(contacts, getStoreState().contacts, contact => {
      return parseInt(contact.phone_number) || contact.phoneNumber;
    });
    await Api.post(IMPORT_CONTACTS, {contacts: difference});
  }
}

export async function fetchAllContacts(skip = 0, limit = 40) {
  try {
    const response = await Api.get(GET_CONTACTS, {skip, limit});
    storeDispatch(ContactsCreators.contactsResponse(response));
    if (response.contacts && response.contacts.length === limit) {
      return fetchAllContacts(skip + response.contacts.length);
    }
  } catch (e) {
    if (e.name !== END_OF_CONTACTS) {
      throw e;
    }
  }
  return 1;
}

/* ------------- Normalizer ------------- */

function normalizeContacts(contacts) {
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
