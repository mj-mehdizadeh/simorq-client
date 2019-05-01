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

export function ltTime(date) {
  return moment(date).format('LT');
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

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function convertBytes(x) {
  let l = 0;
  let n = parseInt(x, 10) || 0;
  while (n >= 1024) {
    n /= 1024;
    l++;
  }
  return (n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
}

export function convertSecendToTime(secend) {
  const mins = Math.floor(secend / 60) || 0;
  const secs = Math.round(secend - mins * 60) || 0;
  const hrs = Math.floor(secend / 3600) || 0;
  return (hrs > 0 ? (hrs > 9 ? hrs + ':' : '0' + hrs + ':') : '') + (mins > 9 ? mins : '0' + mins) + ':' + (secs > 9 ? secs : '0' + secs);
}
