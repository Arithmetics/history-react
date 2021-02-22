import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

// Slice
const slice = createSlice({
  name: 'labCard',
  initialState: {
    // get one owners cards
    getOwnersCardsLoading: false,
    getOwnersCardsError: false,
    getOwnersCardsSuccess: false,
  },
  reducers: {
    // all players
    getOwnersCardsLoading: (state, _action) => {
      state.getOwnersCardsLoading = true;
      state.getOwnersCardsError = false;
      state.getOwnersCardsSuccess = false;
    },
    getOwnersCardsSuccess: (state, action) => {
      state.getOwnersCardsLoading = false;
      state.getOwnersCardsError = false;
      state.getOwnersCardsSuccess = true;
      state.ownersCards = {
        ...state.ownersCards,
        [action.payload.ownerId]: action.payload.seasonCards,
      };
    },
    getOwnersCardsError: (state, _action) => {
      state.getOwnersCardsLoading = false;
      state.getOwnersCardsError = true;
      state.getOwnersCardsSuccess = false;
    },
  },
});
export default slice.reducer;

const {
  getOwnersCardsLoading,
  getOwnersCardsSuccess,
  getOwnersCardsError,
} = slice.actions;

export const getOwnersCards = (ownerId) => async (dispatch) => {
  dispatch(getOwnersCardsLoading());
  try {
    const response = await api.get(`/season_cards/${ownerId}.json`);
    dispatch(
      getOwnersCardsSuccess({
        ownerId,
        seasonCards: response.data.seasonCards,
      }),
    );
  } catch (e) {
    dispatch(getOwnersCardsError());
    return console.error(e.message);
  }
};
