import {AsyncStorage} from 'react-native';

const STORAGE_PREFIX = '@SIQ';

export function removeData(key) {
  return AsyncStorage.removeItem(getKey(key));
}
export function storeData(key, value) {
  return AsyncStorage.setItem(getKey(key), value);
}

export async function retrieveData(key) {
  return AsyncStorage.getItem(getKey(key));
}

function getKey(key) {
  return `${STORAGE_PREFIX}:${key}`;
}
