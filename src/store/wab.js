import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

// Slice
const slice = createSlice({
  name: 'wab',
  initialState: {
    // new wab
    newWABLoading: false,
    newWABError: false,
    newWABSuccess: false,
    // all wab
    allWABLoading: false,
    allWABError: false,
    allWABSuccess: false,
    // delete wab
    deleteWABLoading: false,
    deleteWABError: false,
    deleteWABSuccess: false,
  },
  reducers: {
    // new WAB
    newWABLoading: (state, _action) => {
      state.newWABLoading = true;
      state.newWABError = false;
      state.newWABSuccess = false;
    },
    newWABSuccess: (state, action) => {
      state.newWABLoading = false;
      state.newWABError = false;
      state.newWABSuccess = true;
      state.allWAB = [action.payload, ...state.allWAB];
    },
    newWABError: (state, _action) => {
      state.newWABLoading = false;
      state.newWABError = true;
      state.newWABSuccess = false;
    },
    // all WAB
    allWABLoading: (state, _action) => {
      state.allWABLoading = true;
      state.allWABError = false;
      state.allWABSuccess = false;
    },
    allWABSuccess: (state, action) => {
      state.allWABLoading = false;
      state.allWABError = false;
      state.allWABSuccess = true;
      state.allWAB = action.payload;
    },
    allWABError: (state, _action) => {
      state.allWABLoading = false;
      state.allWABError = true;
      state.allWABSuccess = false;
    },
    // delete WAB
    deleteWABLoading: (state, _action) => {
      state.deleteWABLoading = true;
      state.deleteWABError = false;
      state.deleteWABSuccess = false;
    },
    deleteWABSuccess: (state, action) => {
      state.deleteWABLoading = false;
      state.deleteWABError = false;
      state.deleteWABSuccess = true;
      state.allWAB = state.allWAB.filter(
        (p) => p.id !== action.payload,
      );
    },
    deleteWABError: (state, _action) => {
      state.deleteWABLoading = false;
      state.deleteWABError = true;
      state.deleteWABSuccess = false;
    },
  },
});
export default slice.reducer;

// Actions
const {
  newWABLoading,
  newWABSuccess,
  newWABError,
  allWABLoading,
  allWABSuccess,
  allWABError,
  deleteWABLoading,
  deleteWABSuccess,
  deleteWABError,
} = slice.actions;

export const newWAB = ({ id, amount, year, week, winning }) => async (
  dispatch,
) => {
  dispatch(newWABLoading());
  try {
    const response = await api.post('/waiver_bids.json', {
      wab: {
        id,
        amount,
        year,
        week,
        winning,
      },
    });
    dispatch(newWABSuccess(response.data.wab));
  } catch (e) {
    dispatch(newWABError());
    return console.error(e.message);
  }
};

export const getAllWAB = () => async (dispatch) => {
  dispatch(allWABLoading());
  try {
    const response = await api.get('/waiver_bids.json');
    dispatch(allWABSuccess(response.data.wab));
  } catch (e) {
    dispatch(allWABError());
    return console.error(e.message);
  }
};

export const deleteWAB = (wabId) => async (dispatch) => {
  dispatch(deleteWABLoading());
  try {
    await api.delete(`waiver_bids/${wabId}.json`);
    dispatch(deleteWABSuccess(wanId));
  } catch (e) {
    dispatch(deleteWABError());
    return console.error(e.message);
  }
};
