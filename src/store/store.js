import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import user from "./user";
import player from "./player";

const reducer = combineReducers({
  player,
  user,
});
const store = configureStore({
  reducer,
});
export default store;
