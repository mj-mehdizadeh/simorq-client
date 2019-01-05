export default class AppError extends Error {

  _name;
  _params;

  constructor(name, params) {
    super();
    this._name = name;
    this._params = params;
  }

  get name() {
    return this._name;
  }

  get params() {
    return this._params;
  }

  set name(name) {
    this._name = name;
  }

  set params(params) {
    this._params = params;
  }
}
