export default class RequestWrapper {

  constructor(resolve, reject, actionId, data, options) {
    this._resolve = resolve;
    this._reject = reject;
    this._actionId = actionId;
    this._data = data;
    this._options = options;
  }

  /**
   * @type Promise
   */
  _promise;

  /**
   * @return {Promise}
   */
  get promise() {
    return this._promise;
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

  resolve(value) {
    this._resolve(value);
  }

  reject(reason) {
    this._reject(reason);
  }
}
