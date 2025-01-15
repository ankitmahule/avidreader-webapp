import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SAVE_QUOTE_API, GET_QUOTE_API } from "../../shared/constants";
export const saveQuote = createAsyncThunk(
  "quotes/saveQuote",
  async ({ content, userId }, { rejectWithValue }) => {
    try {
      console.log(content + userId);
      const config = {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.post(
        SAVE_QUOTE_API,
        { userId, content },
        config
      );
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

const handleError = (error, rejectWithValue) => {
  if (error.response && error.response.data.message) {
    return rejectWithValue(error.response.data);
  } else {
    return rejectWithValue(error.message);
  }
};
