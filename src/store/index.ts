import { combineReducers } from 'redux';
import todo from './todo';
import common from './common';

export default combineReducers({
  todo,
  common,
});
