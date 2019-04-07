import {forIn} from 'lodash';
import Socket from './socket';
import AppCreators from '../redux/appRedux';
import {store} from '../redux/configureStore';

const events = {
  connect: onConnect,
  disconnect: onDisconnect,
  newMessage: onNewMessage,
};

export function initEvents() {
  forIn(events, (func, key) => {
    Socket.on(key, func);
  });
}

function onConnect() {
  store.dispatch(AppCreators.setState('UPDATING'));
}

function onDisconnect() {
  store.dispatch(AppCreators.setState('CONNECTING'));
}

function onNewMessage() {

}