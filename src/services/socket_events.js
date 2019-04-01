import {forIn} from 'lodash';
import Socket from './socket';
import AppCreators from '../redux/appRedux';

let _dispatch = null;
const events = {
  connect: onConnect,
  disconnect: onDisconnect,
  newMessage: onNewMessage,
};

export function initEvents(dispatch) {
  _dispatch = dispatch;
  forIn(events, (func, key) => {
    Socket.on(key, func);
  });
}

function onConnect() {
  _dispatch(AppCreators.setState('UPDATING'));
}

function onDisconnect() {
  _dispatch(AppCreators.setState('CONNECTING'));
}

function onNewMessage() {

}