import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_API, REGISTER_API } from "../../shared/constants";
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
      console.log(response.data);
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
        headers: {
          "content-type": "application/json",
        },
      };
      const response = await axios.post(LOGIN_API, { email, password }, config);
      console.log(response.data);
      if (response) {
        sessionStorage.setItem("authToken", response.data.authToken);
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
