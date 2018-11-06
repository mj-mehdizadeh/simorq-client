import * as methods from './index';

const rulesTable = {
  [methods.AUTH_SEND_CODE]: {
    phone_number: {
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
