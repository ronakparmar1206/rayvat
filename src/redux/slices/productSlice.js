import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
const initialState = {
  isLoading: false,
  isSuccess: false,
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProductApi.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getProductApi.fulfilled, (state, { payload }) => {
      console.log(payload, "payload");
      state.isLoading = false;
      state.isSuccess = true;
      state.product = payload.products;
    });
    builder.addCase(getProductApi.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

// --export actions---
export const getProductApi = createAsyncThunk(
  "product/productSlice",
  async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export default productSlice.reducer;
