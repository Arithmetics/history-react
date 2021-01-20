import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import user from './user';
import player from './player';
import wab from './wab';

const reducer = combineReducers({
  player,
  user,
  wab,
});
const store = configureStore({
  reducer,
});
export default store;
