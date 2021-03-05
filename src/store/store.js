import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import user from './user';
import player from './player';
import wab from './wab';
import fantasyTeam from './fantasyTeam';
import labCard from './labCard';

const reducer = combineReducers({
  player,
  user,
  wab,
  fantasyTeam,
  labCard,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 100,
      },
      immutableCheck: {
        warnAfter: 100,
      },
    }),
});

export default store;
