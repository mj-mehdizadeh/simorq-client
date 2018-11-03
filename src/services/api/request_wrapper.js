export default class RequestWrapper {

  /**
   * @type Promise
   */
  _promise;

  _tried = 3;

  constructor(resolve, reject, actionId, params, promise) {
    this._resolve = resolve;
    this._reject = reject;
    this._actionId = actionId;
    this._params = params;
    this._promise = promise;
  }

  get actionId() {
    return this._actionId;
  }

  get params() {
    return this._params;
  }

  get tried() {
    if (this._tried) {
      this._tried--;
    }
    return this._tried;
  }

  /**
   * @return {Promise}
   */
  get promise() {
    return this._promise;
  }

  getRequestParams(method) {
    return method === 'get' ? {params: this._params} : this._params;
  }

  resolve(value) {
    this._resolve(value);
  }

  reject(reason) {
    this._reject(reason);
  }
}
