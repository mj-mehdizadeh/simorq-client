import PQueue from 'p-queue';
import {API_BASE_URL, API_CONCURRENCY} from '../../constant/config';
import * as actions from '../../constant/methods/index';
import RequestWrapper from './request_wrapper';
import {getAggregateId} from '../../constant/methods/aggregate';
import {getPriority} from '../../constant/methods/priority';
import {getMethod} from '../../constant/methods/methods';
import axios from 'axios';
import ApiError from './api_error';

const apiSingleton = Symbol();
const apiSingletonEnforcer = Symbol();

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

    if (!actions[actionId]) {
      throw new Error(`Invalid actionId #${actionId}`);
    }

    let wrapper;
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

    _queue.add(() => {
      this.instance.run(wrapper);
    }, {
      priority: getPriority(actionId),
    });

    return promise;
  }

  /**
   * @param {RequestWrapper} requestWrapper
   * @returns {Promise<void>}
   */
  async run(requestWrapper) {
    const method = getMethod(requestWrapper.actionId);
    const action = method === 'socket' ? this.socketEmit : this.sendRequest;

    try {
      const response = await action(requestWrapper.actionId, requestWrapper.params);
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
      return axiosApi[method](
        requestWrapper.actionId,
        this._getMethodParams(requestWrapper.params),
      );
    } catch (error) {
      const apiError = new ApiError();
      if (error.response) {
        if (error.response.code === 'access_token_expired') {
          //todo await requestAccessToken();
          //todo return this.sendRequest(requestWrapper)
        }
        apiError.code = error.code;
        apiError.data = error.data;
      } else {
        // todo check your network
        if (requestWrapper.tried()) {
          return this.sendRequest(requestWrapper);
        }
        apiError.code = 'unexpected_error';
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
