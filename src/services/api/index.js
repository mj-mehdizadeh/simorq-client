import PQueue from 'p-queue';
import validate from 'validate.js';
import {API_BASE_URL, API_CONCURRENCY} from '../../constant/config';
import RequestWrapper from './request_wrapper';
import {getAggregateId} from '../../constant/methods/aggregate';
import {getPriority} from '../../constant/methods/priority';
import {getMethod} from '../../constant/methods/methods';
import axios from 'axios';
import ApiError from './api_error';
import {randomString} from '../core';
import {getRule} from '../../constant/methods/rules';

const apiSingleton = randomString(10);
const apiSingletonEnforcer = randomString(10);

let aggregate = new Map();

const _queue = new PQueue({concurrency: API_CONCURRENCY});

const axiosApi = axios.create({
  baseURL: API_BASE_URL,
});


export default class Api {

  constructor(enforcer) {
    if (enforcer !== apiSingletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }
  }

  /**
   * Get Api instance
   * @returns {Api}
   */
  static get instance() {
    if (!this[apiSingleton]) {
      this[apiSingleton] = new Api(apiSingletonEnforcer);
    }
    return this[apiSingleton];
  }

  /**
   *
   * @param {string} actionId
   * @param {Object} params
   * @returns {Promise<any>}
   */
  static invoke(actionId, params) {
    let wrapper;
    Api.validate(actionId, params);
    const promise = new Promise((resolve, reject) => {
      wrapper = new RequestWrapper(
        resolve,
        reject,
        actionId,
        params,
      );
    });
    wrapper.promise = promise;

    const aggregateId = getAggregateId(wrapper);
    if (aggregateId && aggregate.has(aggregateId)) {
      return aggregate.get(aggregateId);
    }

    if (aggregateId) {
      aggregate.set(aggregateId, wrapper.promise);
    }

    _queue.add(() => this.instance.run(wrapper), {
      priority: getPriority(actionId),
    });

    return promise;
  }

  static validate(actionId, params) {
    const errors = validate(params, getRule(actionId));
    if (errors) {
      const apiError = new ApiError();
      apiError.code = 'validate_error';
      apiError.params = errors;
      throw apiError;
    }
  }

  /**
   * @param {RequestWrapper} requestWrapper
   * @returns {Promise<void>}
   */
  async run(requestWrapper) {
    const method = getMethod(requestWrapper.actionId);
    const action = method === 'socket' ? this.socketEmit.bind(this) : this.sendRequest.bind(this);

    try {
      const response = await action(requestWrapper);
      requestWrapper.resolve(response);
    } catch (error) {
      requestWrapper.reject(error);
      throw error;
    } finally {
      this._done(requestWrapper);
    }
  }

  /**
   * @param {RequestWrapper} requestWrapper
   * @returns {Promise<void>}
   */
  async sendRequest(requestWrapper) {
    const method = getMethod(requestWrapper.actionId);
    try {
      const response = await axiosApi[method](
        requestWrapper.actionId,
        requestWrapper.getRequestParams(method),
      );
      return response.data;
    } catch (error) {
      const apiError = new ApiError();
      if (error.response) {
        if (error.response.data) {
          if (error.response.data.code === 'access_token_expired') {
            //todo await requestAccessToken();
            //todo return this.sendRequest(requestWrapper)
          }
          apiError.code = error.response.data.code;
          apiError.params = error.response.data.params;
        } else {
          apiError.code = error.response.status === 500 ? 'internal_server_error' : 'unexpected_error';
        }
      } else {
        // todo check your network
        if (requestWrapper.tried) {
          return this.sendRequest(requestWrapper);
        }
        apiError.code = 'unknown_error';
      }
      throw apiError;
    }
  }

  /**
   * return axios params
   * @param method
   * @param params
   * @returns {*}
   * @private
   */
  _getMethodParams(method, params) {
    if (method === 'get') {
      return {params};
    }
    return params;
  }

  /**
   * @param actionId
   * @param params
   * @returns {Promise<void>}
   */
  async socketEmit(actionId, params) {

  }

  _done(requestWrapper) {
    const aggregateId = getAggregateId(requestWrapper);
    if (aggregateId && aggregate.has(aggregateId)) {
      return aggregate.delete(aggregateId);
    }
  }
}
