import {combineReducers} from 'redux';

export default combineReducers({
  config: require('./AppRedux').reducer,
});
