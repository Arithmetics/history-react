import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Slice
const slice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    loginLoading: false,
    loginError: false,
  },
  reducers: {
    loginLoading: (state, _action) => {
      state.loginLoading = true;
      state.loginError = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.loginError = false;
      state.loginLoading = false;
    },
    logoutSuccess: (state, _action) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      state.loginError = false;
      state.loginLoading = false;
    },
    loginError: (state, _action) => {
      state.loginError = true;
      state.loginLoading = false;
    },
  },
});
export default slice.reducer;

// Actions
const { loginSuccess, logoutSuccess, loginLoading, loginError } = slice.actions;
export const login = ({ email, password }) => async (dispatch) => {
  dispatch(loginLoading());
  try {
    const response = await api.post("/login", { user: { email, password } });
    console.log(response);
    const { admin } = response.data;
    const { authorization } = response.headers;
    dispatch(
      loginSuccess({ user: { email, isAdmin: admin }, token: authorization })
    );
  } catch (e) {
    dispatch(loginError());
    return console.error(e.message);
  }
};
export const logout = () => async (dispatch) => {
  try {
    await api.post("/logout");
    return dispatch(logoutSuccess());
  } catch (e) {
    console.error(e.message);
    return dispatch(logoutSuccess());
  }
};
