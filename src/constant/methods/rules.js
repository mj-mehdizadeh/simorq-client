import * as methods from './index';

const rulesTable = {
  [methods.AUTH_SEND_CODE]: {
    phone_number: {
      presence: true,
      numericality: true,
    },
  },
  [methods.AUTH_LOGIN]: {
    phone_number: {
      presence: true,
      numericality: true,
    },
    phone_code: {
      presence: true,
      numericality: true,
    },
  },
  [methods.AUTH_REGISTER]: {
    title: {
      presence: true,
    },
    phone_number: {
      presence: true,
      numericality: true,
    },
    phone_code: {
      presence: true,
      numericality: true,
    },
  },
};

/**
 * @param {string} actionId
 * @returns {Object}
 */
export function getRule(actionId) {
  return rulesTable[actionId];
}
