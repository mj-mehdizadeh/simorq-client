import {floor} from 'lodash';
import moment from 'moment';
import {translate} from './i18n';

/**
 * Mili-seconds sleep
 * @param {number} miliSeconds
 * @returns {Promise}
 */
export function msSleep(miliSeconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, miliSeconds);
  });
}

/**
 * Sleep
 * @param {number} seconds
 */
export function sleep(seconds) {
  return msSleep(seconds * 1000);
}


/**
 * Generate random string
 * @param {number} length
 * @param {string} chars
 * @returns {string}
 */
export function randomString(length, chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz') {
  let str = '';
  const charsLen = chars.length;

  for (let i = 0; i < length; i++) {
    str += chars.charAt(floor(Math.random() * charsLen));
  }
  return str;
}

export function mkPhoneNumber(countryCode, phoneNumber) {
  return parseInt((countryCode + '' + phoneNumber).replace(/\s+/g, ''), 10);
}

export function msgTime(date) {
  const msgDate = moment(date);
  const tody = moment(Date.now());

  if (msgDate.year() !== tody.year()) {
    return msgDate.format('MMM D,Y');
  } else if (msgDate.week() !== tody.week()) {
    return msgDate.format('MMM D');
  } else if (tody.day() - msgDate.day() > 1) {
    return msgDate.format('dddd');
  } else if (tody.day() - msgDate.day() === 1) {
    return translate('date.yesterday');
  }

  return msgDate.format('LT');
}

export function unreadCount(number) {
  return number > 99 ? '+99' : number;
}

export function mongoObjectId() {
  const timestamp = (new Date().getTime() / 1000|0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
    return (Math.random() * 16|0).toString(16);
  }).toLowerCase();
}
