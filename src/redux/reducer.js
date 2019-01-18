import {combineReducers} from 'redux';
import {reducer as config} from './AppRedux';
import {reducer as rooms} from './rooms';
import {reducer as messages} from './messages';

export default combineReducers({
  config,
  rooms,
  messages,
});
