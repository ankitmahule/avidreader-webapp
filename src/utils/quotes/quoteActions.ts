import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  SAVE_QUOTE_API,
  GET_QUOTE_API,
  UPLOAD_QUOTE_API,
  UPDATE_BOOKMARK_API,
} from "../../shared/constants";
export const saveQuote = createAsyncThunk(
  "quotes/saveQuote",
  async (request, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const response = await axios.post(SAVE_QUOTE_API, request, config);
      if (response) return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const uploadQuote = createAsyncThunk(
  "quotes/uploadQuote",
  async (formdata, { rejectWithValue }) => {
    try {
      const config = {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
      };

      const response = await axios.post(UPLOAD_QUOTE_API, formdata, config);
      if (response) return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getQuotes = createAsyncThunk(
  "quotes/getQuotes",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.get(GET_QUOTE_API, config);
      if (response && response.data) {
        return response.data;
      }
    } catch (error) {
      if (error) return handleError(error, rejectWithValue);
    }
  }
);

export const bookmarkQuote = createAsyncThunk(
  "auth/bookmark-quote",
  async (quoteId, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.put(UPDATE_BOOKMARK_API, quoteId, config);
      if (response?.data) {
        return response?.data;
      }
    } catch (error) {
      if (error) return handleError(error, rejectWithValue);
    }
  }
);

const handleError = (error, rejectWithValue) => {
  if (error.response && error.response.data.message) {
    return rejectWithValue(error.response.data);
  } else {
    return rejectWithValue(error.message);
  }
};
