import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {concat, map, trim, uniqBy} from 'lodash';

export async function getAllContacts() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    {
      'title': 'Contacts',
      'message': 'This app would like to view your contacts.',
    }
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
  return uniqBy(
    concat(
      map(contacts, contact => {
        return map(contact.phoneNumbers, phoneNumber =>
          ({title: `${contact.givenName} ${contact.middleName} ${contact.familyName}`, phoneNumber: trim(phoneNumber)})
        );
      })
    )
  );
}

export async function importAllContacts() {

}