import { createSlice } from "@reduxjs/toolkit";
import {
  saveQuote,
  getQuotes,
  uploadQuote,
  bookmarkQuote,
} from "./quoteActions";

const initialState = {
  loading: false,
  quotes: [],
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
      state.success = payload.quotes;
      state.error = null;
    });
    builder.addCase(saveQuote.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
    });
    builder.addCase(uploadQuote.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadQuote.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = payload.quotes;
      state.error = null;
    });
    builder.addCase(uploadQuote.rejected, (state, { payload }) => {
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
      state.quotes = payload.quotes;
    });
    builder.addCase(getQuotes.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
    });

    builder.addCase(bookmarkQuote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(bookmarkQuote.fulfilled, (state, { payload }) => {
      state.loading = false;
      const updatedBookmark = payload;
      state.quotes = state?.quotes?.map((eachQuote) => {
        return eachQuote._id === updatedBookmark.response._id
          ? updatedBookmark.response
          : eachQuote;
      });
      state.error = null;
    });
    builder.addCase(bookmarkQuote.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
    });
  },
});
export const { resetQuotesState } = quoteSlice.actions;

export default quoteSlice.reducer;
