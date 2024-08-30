import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { TopShows } from "../components/render-cards/TopShows";
import { TopMovies } from "../components/render-cards/TopMovies";
import { Header } from "../components/Header/Header";

export const Layout = () => {
  const [showScroll, setShowScroll] = useState(0);
  const [movieScroll, setMovieScroll] = useState(0);

  useEffect(() => {
    const movieGrid = document.querySelector("#tv-show-grid");
    movieGrid.addEventListener(
      "scroll",
      () => {
        setShowScroll(() => movieGrid?.scrollLeft);
      },
      [showScroll]
    );
  });

  useEffect(() => {
    const movieGrid = document.querySelector("#movie-grid");
    movieGrid.addEventListener(
      "scroll",
      () => {
        setMovieScroll(() => movieGrid?.scrollLeft);
      },
      [movieScroll]
    );
  });

  return (
    <>
      <Grid container display="flex" flexDirection="column" width="100vw">
        <Grid
          flexDirection="row"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Header />
        </Grid>
        <Grid m={1}>
          <Typography fontFamily="sans-serif" fontSize={20}>
            POPULAR MOVIES THIS WEEK
          </Typography>
        </Grid>
        <Grid
          sx={{
            maskImage:
              movieScroll > 0
                ? [
                    "linear-gradient(to left, black calc(100% - 200px), transparent 100%)",
                    "linear-gradient(to right, transparent 0%, black 200px, black calc(100% - 200px), transparent 100%)",
                  ]
                : [
                    "linear-gradient(to right,  black calc(100% - 200px), transparent 100%)",
                  ],
          }}
          id="movie-grid"
          display="flex"
          flexDirection="row"
          width="100vw"
          alignItems="center"
          overflow="scroll"
        >
          <TopMovies />
        </Grid>
      </Grid>
      <Grid container display="flex" flexDirection="column" width="100vw">
        <Grid m={1}>
          <Typography fontFamily="sans-serif" fontSize={20}>
            POPULAR TV SHOWS THIS WEEK
          </Typography>
        </Grid>
        <Grid
          sx={{
            maskImage:
              showScroll > 0
                ? [
                    "linear-gradient(to left, black calc(100% - 200px), transparent 100%)",
                    "linear-gradient(to right, transparent 0%, black 200px, black calc(100% - 200px), transparent 100%)",
                  ]
                : [
                    "linear-gradient(to right,  black calc(100% - 200px), transparent 100%)",
                  ],
          }}
          id="tv-show-grid"
          display="flex"
          flexDirection="row"
          width="100vw"
          overflow="scroll"
          alignItems="center"
        >
          <TopShows />
        </Grid>
      </Grid>
    </>
  );
};
