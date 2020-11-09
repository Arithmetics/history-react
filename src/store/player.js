import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

// Slice
const slice = createSlice({
  name: "player",
  initialState: {
    // new player
    newPlayerLoading: false,
    newPlayerError: false,
    newPlayerSuccess: false,
    // all players
    allPlayersLoading: false,
    allPlayersError: false,
    allPlayersSuccess: false,
  },
  reducers: {
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
  },
});
export default slice.reducer;

// Actions
const { newPlayerLoading, newPlayerSuccess, newPlayerError, allPlayersLoading, allPlayersSuccess, allPlayersError } = slice.actions;

export const newPlayer = ({
  name,
  profileId,
  pictureId,
  nflURLName,
  birthdate,
}) => async (dispatch) => {
  dispatch(newPlayerLoading());
  console.log(name, profileId, pictureId, nflURLName, birthdate);
  try {
    const response = await api.post("/players.json", {
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

export const getAllPlayers =() => async (dispatch) => {
  console.log("get all players")
  dispatch(allPlayersLoading());
  try {
    const response = await api.get("/players.json");
    console.log(response)
    dispatch(allPlayersSuccess(response.data.players))
  } catch (e) {
    dispatch(allPlayersError());
    return console.error(e.message)
  }
}