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
      if (error) return rejectWithValue(error.data);
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
        localStorage.setItem("authToken", response.data.authToken);
        return response.data;
      }
    } catch (error) {
      if (error) return rejectWithValue(error.data);
    }
  }
);
