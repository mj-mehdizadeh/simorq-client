export default class ApiError extends Error {

  _code;
  _data;

  constructor(code, data) {
    super();
    this._code = code;
    this._data = data;
  }

  get code() {
    return this._code;
  }

  get data() {
    return this._data;
  }

  set code(code) {
    this._code = code;
  }

  set data(data) {
    this._data = data;
  }
}
