import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_API, REGISTER_API, PROFILE_API } from "../../shared/constants";
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, contactNo }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const response = await axios.post(
        REGISTER_API,
        { email, password, contactNo },
        config
      );
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

const handleError = (error, rejectWithValue) => {
  if (error.response && error.response.data.message) {
    return rejectWithValue(error.response.data);
  } else {
    return rejectWithValue(error.message);
  }
};
