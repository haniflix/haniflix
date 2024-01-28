import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../rtk-query/authApi";
import type { RootState } from "../store";

interface AuthState {
  user: any;
  rememberMe: boolean;
}

const initialState: AuthState = {
  user: null,
  rememberMe: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
    updateToken: (state, action) => {
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }, action) => {
        if (action?.meta.arg.rememberMe) {
          state.rememberMe = true;
          // ... store accessToken and refreshToken if applicable
        }
        // state.refreshToken = payload.refreshToken;
        if (payload.isAdmin == true) {
          state.loggedIn = true;
          state.user = payload;
        }
      }
    );
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const { updateToken } = authSlice.reducer;

export default authSlice.reducer;
