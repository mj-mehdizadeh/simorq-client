import {AsyncStorage} from 'react-native';

const STORAGE_PREFIX = '@SIQ';

export function removeData(key) {
  return AsyncStorage.removeItem(getKey(key));
}

export function storeData(key, value) {
  return AsyncStorage.setItem(getKey(key), JSON.stringify(value));
}

export async function retrieveData(key) {
  const data = await AsyncStorage.getItem(getKey(key));
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

function getKey(key) {
  return `${STORAGE_PREFIX}:${key}`;
}
