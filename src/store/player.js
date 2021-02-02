import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

// Slice
const slice = createSlice({
  name: 'player',
  initialState: {
    // new player
    newPlayerLoading: false,
    newPlayerError: false,
    newPlayerSuccess: false,
    // all players
    allPlayersLoading: false,
    allPlayersError: false,
    allPlayersSuccess: false,
    // delete player
    deletePlayerLoading: false,
    deletePlayerError: false,
    deletePlayerSuccess: false,
  },
  reducers: {
    // new player
    newPlayerLoading: (state, _action) => {
      state.newPlayerLoading = true;
      state.newPlayerError = false;
      state.newPlayerSuccess = false;
    },
    newPlayerSuccess: (state, action) => {
      state.newPlayerLoading = false;
      state.newPlayerError = false;
      state.newPlayerSuccess = true;
      state.allPlayers = [action.payload, ...state.allPlayers];
    },
    newPlayerError: (state, _action) => {
      state.newPlayerLoading = false;
      state.newPlayerError = true;
      state.newPlayerSuccess = false;
    },
    // all players
    allPlayersLoading: (state, _action) => {
      state.allPlayersLoading = true;
      state.allPlayersError = false;
      state.allPlayersSuccess = false;
    },
    allPlayersSuccess: (state, action) => {
      state.allPlayersLoading = false;
      state.allPlayersError = false;
      state.allPlayersSuccess = true;
      state.allPlayers = action.payload;
    },
    allPlayersError: (state, _action) => {
      state.allPlayersLoading = false;
      state.allPlayersError = true;
      state.allPlayersSuccess = false;
    },
    // delete player
    deletePlayerReset: (state, _action) => {
      state.deletePlayerLoading = false;
      state.deletePlayerError = false;
      state.deletePlayerSuccess = false;
    },
    deletePlayerLoading: (state, _action) => {
      state.deletePlayerLoading = true;
      state.deletePlayerError = false;
      state.deletePlayerSuccess = false;
    },
    deletePlayerSuccess: (state, action) => {
      state.deletePlayerLoading = false;
      state.deletePlayerError = false;
      state.deletePlayerSuccess = true;
      state.allPlayers = state.allPlayers.filter(
        (p) => p.id !== action.payload,
      );
    },
    deletePlayerError: (state, _action) => {
      state.deletePlayerLoading = false;
      state.deletePlayerError = true;
      state.deletePlayerSuccess = false;
    },
  },
});
export default slice.reducer;

// Actions
const {
  newPlayerLoading,
  newPlayerSuccess,
  newPlayerError,
  allPlayersLoading,
  allPlayersSuccess,
  allPlayersError,
  deletePlayerLoading,
  deletePlayerSuccess,
  deletePlayerError,
  deletePlayerReset,
} = slice.actions;

export const newPlayer = ({
  name,
  profileId,
  pictureId,
  nflURLName,
  birthdate,
}) => async (dispatch) => {
  dispatch(newPlayerLoading());
  try {
    const response = await api.post('/players.json', {
      player: {
        name,
        id: profileId,
        picture_id: pictureId,
        nfl_URL_name: nflURLName,
        birthdate,
      },
    });
    dispatch(newPlayerSuccess(response.data.player));
  } catch (e) {
    dispatch(newPlayerError());
    return console.error(e.message);
  }
};

export const getAllPlayers = () => async (dispatch) => {
  dispatch(allPlayersLoading());
  try {
    const response = await api.get('/players.json');
    dispatch(allPlayersSuccess(response.data.players));
  } catch (e) {
    dispatch(allPlayersError());
    return console.error(e.message);
  }
};

export const deletePlayer = (playerId) => async (dispatch) => {
  dispatch(deletePlayerLoading());
  try {
    await api.delete(`players/${playerId}.json`);
    dispatch(deletePlayerSuccess(playerId));
  } catch (e) {
    dispatch(deletePlayerError());
    return console.error(e.message);
  }
};

export const resetDeletePlayer = () => (dispatch) => {
  dispatch(deletePlayerReset());
};
