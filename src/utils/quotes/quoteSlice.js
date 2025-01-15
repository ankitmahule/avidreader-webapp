import { createSlice } from "@reduxjs/toolkit";
import { saveQuote, getQuotes } from "./quoteActions";

const initialState = {
  loading: false,
  quotes: null,
  error: null,
  success: null,
};

const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    resetQuotesState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveQuote.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(saveQuote.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = payload;
    });
    builder.addCase(saveQuote.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
    });
    builder.addCase(getQuotes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getQuotes.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.quotes = payload;
    });
    builder.addCase(getQuotes.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
    });
  },
});
export const { resetQuotesState } = quoteSlice.actions;

export default quoteSlice.reducer;
