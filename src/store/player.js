import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

// Slice
const slice = createSlice({
  name: "player",
  initialState: {
    newPlayerLoading: false,
    newPlayerError: false,
    newPlayerSuccess: false,
  },
  reducers: {
    newPlayerLoading: (state, _action) => {
      state.newPlayerLoading = true;
      state.newPlayerError = false;
    },
    newPlayerSuccess: (state, _action) => {
      state.newPlayerLoading = false;
      state.newPlayerError = false;
    },
    newPlayerError: (state, _action) => {
      state.newPlayerLoading = false;
      state.newPlayerError = true;
    },
  },
});
export default slice.reducer;

// Actions
const { newPlayerLoading, newPlayerSuccess, newPlayerError } = slice.actions;

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
    console.log(response.data.player);
    dispatch(newPlayerSuccess());
  } catch (e) {
    dispatch(newPlayerError());
    return console.error(e.message);
  }
};
