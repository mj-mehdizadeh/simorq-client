import {combineReducers} from 'redux';
import {reducer as app} from './appRedux';
import {reducer as rooms} from './rooms';
import {reducer as messages} from './messages';

export default combineReducers({
  app,
  rooms,
  messages,
});
