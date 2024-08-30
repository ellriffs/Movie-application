import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const key = import.meta.env.VITE_ACCESS_TOKEN

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${key}`,
  },
};

export const fetchConfig = createAsyncThunk(`getConfig`, async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/configuration`,
    options
  );
  const data = await res.json();
  return data;
});

const configurationSlice = createSlice({
  name: "config",
  initialState: {
    baseUrl: null,
    fileSize: null,
    loading: false,
    data: null,
    error: false,
    success: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConfig.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchConfig.fulfilled, (state, action) => {
      state.success = true;
      state.data = [action.payload];
      state.baseUrl = [action.payload].map((payload) => payload.images.base_url)
      state.fileSize = [action.payload].map((payload) => payload.images.backdrop_sizes[3])
    });
    builder.addCase(fetchConfig.rejected, (state) => {
      state.error = true;
    });
  },
});

export default configurationSlice.reducer;
