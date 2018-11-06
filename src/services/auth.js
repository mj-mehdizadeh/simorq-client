import {retrieveData, storeData} from './storage';

const AUTH_STORE_KEY = 'authToken';
let _authToken;

export function setAuthToken(token) {
  _authToken = token;
  storeData(AUTH_STORE_KEY, JSON.stringify(token));
}

export async function loadAuthToken() {
  _authToken = await retrieveData(AUTH_STORE_KEY);
  _authToken = JSON.parse(_authToken);
  return _authToken;
}

export function getAuthToken() {
  return _authToken;
}
