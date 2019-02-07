export default class RequestWrapper {

  /**
   * @type Promise
   */
  _promise;

  constructor(resolve, reject, actionId, data, options) {
    this._resolve = resolve;
    this._reject = reject;
    this._actionId = actionId;
    this._data = data;
    this._options = options;
  }

  get actionId() {
    return this._actionId;
  }

  get data() {
    return this._data;
  }

  get options() {
    return this._options;
  }

  /**
   * @return {Promise}
   */
  get promise() {
    return this._promise;
  }

  resolve(value) {
    this._resolve(value);
  }

  reject(reason) {
    this._reject(reason);
  }
}
