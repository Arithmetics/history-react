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
    ownersCards: {},
    // get all cards
    getAllCardsLoading: false,
    getAllCardsError: false,
    getAllCardsSuccess: false,
    allCards: [],
  },
  reducers: {
    // one owners cards
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
    // all cards
    getAllCardsLoading: (state, _action) => {
      state.getAllCardsLoading = true;
      state.getAllCardsError = false;
      state.getAllCardsSuccess = false;
    },
    getAllCardsSuccess: (state, action) => {
      state.getAllCardsLoading = false;
      state.getAllCardsError = false;
      state.getAllCardsSuccess = true;
      state.allCards = action.payload;
    },
    getAllCardsError: (state, _action) => {
      state.getAllCardsLoading = false;
      state.getAllCardsError = true;
      state.getAllCardsSuccess = false;
    },
  },
});
export default slice.reducer;

const {
  getOwnersCardsLoading,
  getOwnersCardsSuccess,
  getOwnersCardsError,
  getAllCardsLoading,
  getAllCardsSuccess,
  getAllCardsError,
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

export const getAllCards = () => async (dispatch) => {
  dispatch(getAllCardsLoading());
  try {
    const response = await api.get(`/season_cards.json`);
    dispatch(getAllCardsSuccess(response.data.seasonCards));
  } catch (e) {
    dispatch(getAllCardsError());
    return console.error(e.message);
  }
};
