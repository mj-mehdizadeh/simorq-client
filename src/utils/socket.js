import io from 'socket.io-client';
import {SOCKET_IO_URL} from '../constant/config';
import OAuth from './oauth';
import {randomString} from './core';

const apiSingleton = randomString(10);
export default class Socket {

  _events = [];

  constructor(events) {
    this._events = events;
    this._events.push(['disconnect', this.checkDisconnect.bind(this)]);
    this.socketConnect();
  }

  /**
   * Get Socket instance
   * @returns {Socket}
   */
  static get instance() {
    return this[apiSingleton];
  }

  _socket = null;

  get socket() {
    return this._socket;
  }

  static init(events) {
    this[apiSingleton] = new Socket(events);
  }

  static emit(id, data) {
    return this.instance.socket.emit(id, data);
  }

  static close() {
    return this.instance.socket.close();
  }

  socketConnect() {
    this._socket = io(SOCKET_IO_URL, {
      query: {
        access_token: OAuth.getToken().access_token,
      },
    });
    this._events.forEach(item => this._socket.on(item[0], item[1]));
  }

  async checkDisconnect(reason) {
    if (reason === 'io server disconnect') {
      await OAuth.grantRefreshToken();
      this.socketConnect();
    }
  }
}
