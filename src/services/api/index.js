import PQueue from 'p-queue';
import validate from 'validate.js';
import {API_BASE_URL, API_CONCURRENCY} from '../../constant/config';
import RequestWrapper from './request_wrapper';
import axios from 'axios';
import {randomString} from '../core';
import {getRule} from '../../constant/methods/rules';
import AppError from '../app_error';
import {UNKNOWN_ERROR, VALIDATE_ERROR} from '../../constant/errors';
import OAuth from '../oauth';

const apiSingleton = randomString(10);
const apiSingletonEnforcer = randomString(10);

const _queue = new PQueue({concurrency: API_CONCURRENCY});

export const axiosApi = axios.create({
  baseURL: API_BASE_URL,
});

export function setAxiosToken(token_type, access_token) {
  axiosApi.defaults.headers.common['Authorization'] = token_type + ' ' + access_token;
}

/**
 * @typedef {{priority: number, loading: boolean}} RequestOptions
 * @type RequestOptions
 */
const DEFAULT_OPTIONS = {
  priority: 100,
  loading: false,
};


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

  static post(actionId, body, options) {
    return Api.instance.invoke('post', actionId, body, options);
  }

  static get(actionId, params, options) {
    return Api.instance.invoke('get', actionId, {params}, options);
  }

  /**
   * @param {string} method
   * @param {string} actionId
   * @param {Object} data
   * @param {RequestOptions} options
   * @returns {Promise<any>}
   */
  invoke(method, actionId, data, options) {
    let wrapper;
    options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    // Api.validate(actionId, data);
    const promise = new Promise((resolve, reject) => {
      wrapper = new RequestWrapper(
        resolve,
        reject,
        actionId,
        data,
        options,
      );
    });

    _queue.add(() => this.run(method, wrapper), {
      priority: options.priority,
    });

    return promise;
  }

  static validate(actionId, params) {
    const errors = validate(params, getRule(actionId));
    if (errors) {
      throw new AppError(VALIDATE_ERROR, errors);
    }
  }

  /**
   * @param {String} method
   * @param {RequestWrapper} requestWrapper
   * @returns {Promise<void>}
   */
  async run(method, requestWrapper) {
    try {
      const response = await this.sendRequest(method, requestWrapper);
      requestWrapper.resolve(response);
    } catch (error) {
      console.log('errpor', error);
      requestWrapper.reject(error);
    }
  }

  /**
   * @param {String} method
   * @param {RequestWrapper} requestWrapper
   * @returns {Promise<void>}
   */
  async sendRequest(method, requestWrapper) {
    try {
      // await checkConnection();
      const response = await axiosApi[method](
        requestWrapper.actionId,
        requestWrapper.data,
      );
      return response.data;
    } catch (error) {
      const appError = new AppError();
      if (!error || !error.response) {
        appError.name = UNKNOWN_ERROR;
      } else {
        switch (error.response.status) {
          case 401:
            await OAuth.grantRefreshToken();
            console.log('OAuth.grantRefreshToken');
            return this.sendRequest(method, requestWrapper);
          default:
            appError.name = error.response.data.name;
            appError.params = error.response.data.params;
            break;
        }
      }
      throw appError;
    }
  }
}
