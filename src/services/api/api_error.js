export default class ApiError extends Error {

  _code;
  _params;

  constructor(code, data) {
    super();
    this._code = code;
    this._params = data;
  }

  get code() {
    return this._code;
  }

  get params() {
    return this._params;
  }

  set code(code) {
    this._code = code;
  }

  set params(data) {
    this._params = data;
  }
}
