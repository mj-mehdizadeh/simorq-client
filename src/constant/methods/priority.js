import {AUTH_LOGIN, AUTH_SEND_CODE} from './index';

const priorityTable = {
  [AUTH_LOGIN]: 1000,
  [AUTH_SEND_CODE]: 1500,
};

export function getPriority(actionId) {
  return priorityTable[actionId] || 0;
}
