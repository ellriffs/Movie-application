import { configureStore } from "@reduxjs/toolkit";
import allMoviesSlice from "./slice/allMoviesSlice";
import configurationSlice from "./slice/configurationSlice";
import tvShowsSlice from "./slice/tvShowsSlice";

export const store = configureStore({
  reducer: {
    movies: allMoviesSlice,
    shows: tvShowsSlice,
    config: configurationSlice
  },
});
