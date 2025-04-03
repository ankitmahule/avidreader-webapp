import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  LOGIN_API,
  REGISTER_API,
  PROFILE_API,
  LOGOUT_API,
  UPDATE_BOOKMARK_API,
} from "../../shared/constants";
export const registerUser = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const response = await axios.post(REGISTER_API, values, config);
      if (response) return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "content-type": "application/json",
        },
      };
      const response = await axios.post(LOGIN_API, { email, password }, config);
      if (response && response.data) {
        return response.data;
      }
    } catch (error) {
      if (error) return handleError(error, rejectWithValue);
    }
  }
);

export const viewProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.get(PROFILE_API, config);
      if (response && response.data) {
        return response.data;
      }
    } catch (error) {
      if (error) return handleError(error, rejectWithValue);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.post(LOGOUT_API, {}, config);
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
  async (request, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.put(UPDATE_BOOKMARK_API, request, config);
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
