import * as methods from 'index';

const methodsTable = {
  [methods.AUTH_SEND_CODE]: 'post',
  [methods.AUTH_LOGIN]: 'post',
  [methods.MESSAGE_NEW]: 'socket',
};

/**
 * @param {string} actionId
 */
export function getMethod(actionId) {
  return methodsTable[actionId];
}
