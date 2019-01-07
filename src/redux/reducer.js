import {combineReducers} from 'redux';
import {reducer as config} from './AppRedux';
import {reducer as rooms} from './rooms';

export default combineReducers({
  config,
  rooms,
});
