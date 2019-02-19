import Api from './api';
import {CLIENT_ME} from '../constant/methods';
import {retrieveData, storeData} from './storage';
import {get} from 'lodash';

export let _ME = null;

export async function fetchMe() {
  _ME = await Api.get(CLIENT_ME);
  await storeData('_ME', _ME);
}

export async function loadMe() {
  _ME = await retrieveData('_ME');
  console.log('_ME', _ME);
}

export function getMe(key) {
  if (key && _ME) {
    return get(_ME, key);
  }
  return _ME;
}
