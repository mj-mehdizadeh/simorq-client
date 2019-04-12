import {combineReducers} from 'redux';
import {reducer as app} from './appRedux';
import {reducer as rooms} from './rooms';
import {reducer as messages} from './messages';
import {reducer as contacts} from './contacts';

export default combineReducers({
  app,
  rooms,
  messages,
  contacts,
});
