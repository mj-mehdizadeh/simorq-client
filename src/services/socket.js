import io from 'socket.io-client';
import {SOCKET_IO_URL} from '../constant/config';
import OAuth from './oauth';
import {randomString} from './core';

const apiSingleton = randomString(10);
export default class Socket {

  constructor() {
    this.init();
  }

  /**
   * Get Socket instance
   * @returns {Socket}
   */
  static get instance() {
    if (!this[apiSingleton]) {
      this[apiSingleton] = new Socket();
    }
    return this[apiSingleton];
  }

  get socket() {
    return this._socket;
  }

  async init() {
    this._socket = io(SOCKET_IO_URL, {
      query: {
        token: OAuth.getToken(),
      },
    });
    this.socket.on('disconnect', async (reason) => {
      if (reason === 'io server disconnect') {
        await OAuth.grantRefreshToken();
        this._socket.connect();
      }
    });
  }

  static on(id, action) {
    return this.instance.socket.on(id, action);
  }

  static emit(id, data) {
    return this.instance.socket.emit(id, data);
  }

  static close() {
    return this.instance.socket.close();
  }
}