import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.token = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;
export default authSlice.reducer;
