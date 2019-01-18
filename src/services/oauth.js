import qs from 'qs';
import {axiosApi, resetAxiosToken, setAxiosToken} from './api';
import {OAUTH_TOKEN} from '../constant/methods';
import {APP_CLIENT_ID} from '../constant/config';
import AppError from './app_error';
import {UNAUTHORIZED_ERROR} from '../constant/errors';
import {removeData, retrieveData, storeData} from './storage';

const AUTH_STORE_KEY = 'authToken';
let _authToken;
let _promise;

export default class OAuth {

  static async grantRefreshToken() {
    if (_promise) {
      return _promise;
    }
    try {
      _promise = axiosApi.post(OAUTH_TOKEN, qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: _authToken.refresh_token,
        client_id: APP_CLIENT_ID,
      }), {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      });
      const response = await _promise;
      return this.storeTokens(response.data);
    } catch (error) {
      if (!error.response || !error.response.data) {
        return this.grantRefreshToken();
      }
      throw new AppError(UNAUTHORIZED_ERROR, null);
    } finally {
      _promise = null;
    }
  }

  static async grantPassword(username, password) {
    try {
      const response = await axiosApi.post(OAUTH_TOKEN, qs.stringify({
        grant_type: 'password',
        username,
        password,
        client_id: APP_CLIENT_ID,
        client_secret: '112233',
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
    setAxiosToken(token.token_type, token.access_token);
    return storeData(AUTH_STORE_KEY, JSON.stringify(token));
  }

  static removeToken() {
    _authToken = null;
    resetAxiosToken();
    return removeData(AUTH_STORE_KEY);
  }

  static async retrieveToken() {
    _authToken = JSON.parse(await retrieveData(AUTH_STORE_KEY));
    if (_authToken) {
      setAxiosToken(_authToken.token_type, _authToken.access_token);
    }
    return _authToken;
  }

  static getToken() {
    return _authToken;
  }
}
