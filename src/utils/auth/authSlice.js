import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, viewProfile, logout } from "./authActions";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = payload;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
    });
    builder.addCase(viewProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(viewProfile.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.error = null;
    });
    builder.addCase(viewProfile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userInfo = null;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userInfo = null;
    });
  },
});
export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
