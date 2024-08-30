import {createSlice } from "@reduxjs/toolkit";



const initialState = {
 isLoading: false,
 initialPage: 1
}


const allMoviesSlice = createSlice({
  name: "movies",
 initialState,
  reducers: {
    setIsLoading:(state, action) => {
      state.isLoading = !action.payload.isLoading
    },
    incrementMoviePage: (state) => {
      state.initialPage = state.initialPage + 1;
    },
    decrementMoviePage: (state) => {
      if (state.initialPage >= 2) {
        state.initialPage = state.initialPage - 1;
      } else {
        state.initialPage = 1;
      }
    },
  },
})

export default allMoviesSlice.reducer;
export const { incrementMoviePage, decrementMoviePage, setIsLoading } =
  allMoviesSlice.actions;
