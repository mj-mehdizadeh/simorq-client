export default class AppError extends Error {

  constructor(name, params) {
    super();
    this.name = name;
    this.params = params;
  }

  _name;

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  _params;

  get params() {
    return this._params;
  }

  set params(params) {
    this._params = params;
  }
}
