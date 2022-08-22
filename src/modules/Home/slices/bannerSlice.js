import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../../../apis/movieAPI";

const initialState = {
  banners: [],
  loading: false,
  errors: null,
};

export const getBanners = createAsyncThunk(
  "home/banner/getBanners",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await movieAPI.getBanners();
      return data.content;
    } catch (error) {
      return rejectWithValue(error.respone.data);
    }
  }
);

const bannerSlice = createSlice({
  name: "home/banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanners.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBanners.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.banners = payload;
    });
    builder.addCase(getBanners.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errors = payload;
    });
  },
});

export default bannerSlice.reducer;
