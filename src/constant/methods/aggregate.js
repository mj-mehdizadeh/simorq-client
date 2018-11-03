import * as methods from './index';

/**
 * @param {string[]} params
 * @return {string}
 */
function createAggregateId(...params) {
  return params.join('_');
}

/**
 * @type {Object.<number, aggregateTableFunction>}
 */
const aggregateTable = {

  [methods.USER_INFO]: function(requestWrapper) {
    return createAggregateId(requestWrapper.actionId, requestWrapper.params.id);
  },
};

/**
 * @param {RequestWrapper} requestWrapper
 * @return {string|number|null}
 */
export function getAggregateId(requestWrapper) {
  const aggregateTableFunction = aggregateTable[requestWrapper.actionId];

  if (aggregateTableFunction) {
    return aggregateTableFunction(requestWrapper);
  }

  return false;
}
