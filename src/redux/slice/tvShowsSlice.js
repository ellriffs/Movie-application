import { createSlice } from "@reduxjs/toolkit";

const tvShowsSlice = createSlice({
  name: "shows",
  initialState: {
    initialPage: 1,
  },
  reducers: {
      incrementTvPage: (state) => {
        state.initialPage = state.initialPage + 1;
      },
      decrementTvPage: (state) => {
        if (state.initialPage >= 2) {
          state.initialPage = state.initialPage - 1;
        } else {
          state.initialPage = 1;
        }
      },
    },
});

export default tvShowsSlice.reducer;
export const {incrementTvPage, decrementTvPage} = tvShowsSlice.actions
