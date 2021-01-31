import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

// Slice
const slice = createSlice({
  name: 'fantasyTeam',
  initialState: {
    // all teams
    allFantasyTeamsLoading: false,
    allFantasyTeamsError: false,
    allFantasyTeamsSuccess: false,
  },
  reducers: {
    // all players
    allFantasyTeamsLoading: (state, _action) => {
      state.allFantasyTeamsLoading = true;
      state.allFantasyTeamsError = false;
      state.allFantasyTeamsSuccess = false;
    },
    allFantasyTeamsSuccess: (state, action) => {
      state.allFantasyTeamsLoading = false;
      state.allFantasyTeamsError = false;
      state.allFantasyTeamsSuccess = true;
      state.allFantasyTeams = action.payload;
    },
    allFantasyTeamsError: (state, _action) => {
      state.allFantasyTeamsLoading = false;
      state.allFantasyTeamsError = true;
      state.allFantasyTeamsSuccess = false;
    },
  },
});
export default slice.reducer;

// Actions
const {
  allFantasyTeamsLoading,
  allFantasyTeamsSuccess,
  allFantasyTeamsError,
} = slice.actions;

export const getAllFantasyTeams = () => async (dispatch) => {
  dispatch(allFantasyTeamsLoading());
  try {
    const response = await api.get('/fantasy_teams.json');
    dispatch(allFantasyTeamsSuccess(response.data.fantasyTeams));
  } catch (e) {
    dispatch(allFantasyTeamsError());
    return console.error(e.message);
  }
};
