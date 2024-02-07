import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
const initialState = {
  isLoading: false,
  isSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userLoginApi.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(userLoginApi.fulfilled, (state, { payload }) => {
      console.log(payload, "payload");
      state.isLoading = false;
      state.isSuccess = true;
      localStorage.setItem("token", payload.token);
    });
    builder.addCase(userLoginApi.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

// --export actions---
export const userLoginApi = createAsyncThunk(
  "auth/userLoginApi",
  async ({ username, password }) => {
    console.log(username, password, "redux");
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export default authSlice.reducer;
