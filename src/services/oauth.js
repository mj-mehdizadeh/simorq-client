import qs from 'qs';
import {axiosApi} from './api';
import {OAUTH_TOKEN} from '../constant/methods';
import {APP_CLIENT_ID} from '../constant/config';
import AppError from './app_error';
import {UNAUTHORIZED_ERROR} from '../constant/errors';
import {retrieveData, storeData} from './storage';

const AUTH_STORE_KEY = 'authToken';
let _authToken;

export default class OAuth {

  static async grantRefreshToken() {
    try {
      const response = await axiosApi.post(OAUTH_TOKEN, qs.stringify({
        grant_type: 'password',
        refresh_token: _authToken.refreshToken,
        client_id: APP_CLIENT_ID,
      }), {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      });
      return this.storeTokens(response.data);
    } catch (error) {
      if (!error.response || !error.response.data) {
        return this.grantRefreshToken();
      }
      throw new AppError(UNAUTHORIZED_ERROR);
    }
  }

  static async grantPassword(username, password) {
    try {
      const response = await axiosApi.post(OAUTH_TOKEN, qs.stringify({
        grant_type: 'password',
        username,
        password,
        client_id: APP_CLIENT_ID,
      }), {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      });
      return this.storeTokens(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        throw new AppError(UNAUTHORIZED_ERROR);
      } else {
        return this.grantPassword(username, password);
      }
    }
  }

  static storeTokens(token) {
    _authToken = token;
    return storeData(AUTH_STORE_KEY, JSON.stringify(token));
  }

  static async retrieveToken() {
    _authToken = JSON.parse(await retrieveData(AUTH_STORE_KEY));
    return _authToken;
  }

  static getToken() {
    return _authToken;
  }
}
