import { AsyncStorage } from 'react-native';
const STORAGE_PREFIX = '@PP30';

export function storeData(key, value) {
  return AsyncStorage.setItem(getKey(key), value);
}

export async function retrieveData(key) {
  const value = await AsyncStorage.getItem(getKey(key));
  if (value !== null) {
    return value;
  }
  throw new Error('Not Found Data');
}

function getKey(key) {
  return `${STORAGE_PREFIX}:${key}`;
}
