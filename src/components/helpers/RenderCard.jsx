import { useSelector, useDispatch } from "react-redux";
import { useRef, useCallback } from "react";
import { Card, CardMedia, Box, Skeleton } from "@mui/material";

export const RenderCard = ({ array, dispatchFunction }) => {
  const { currentStatus } = useSelector((state) => state.movies);
  const baseUrl = useSelector((state) => state.config.baseUrl);
  const fileSize = useSelector((state) => state.config.fileSize);
  const dispatch = useDispatch();
  const observer = useRef();

  const handleDispatch = (dispatchFunction) => {
    return dispatch(dispatchFunction());
  };

  const lastItemObserver = useCallback(
    (node) => {
      if (currentStatus === "loading") {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("visisble");
          handleDispatch(dispatchFunction);
        } else console.log("not-visisble");
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [currentStatus, handleDispatch]
  );

  if (currentStatus === "loading") {
    return Array.from(new Array(19)).map((index) => {
      return (
        <Box key={index} m={1} height="100%" id="movie-container">
          <Skeleton variant="recangular" width="20vw" height={250} />
        </Box>
      );
    });
  }
  return [...new Set(array)].slice(0, 10).map((movie, index) => {
    if (array.length === index + 1) {
      return (
        <Box
          ref={lastItemObserver}
          key={movie.id}
          m={1}
          height="100%"
          id="movie-container"
        >
          <Card sx={{width: array.length < 2 ? '100vw' : "20vw", "&:hover": { height: "120%" } }} raised>
            <Box
              sx={{
                position: "relative",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardMedia
                alt={
                  movie.original_title
                    ? movie.original_title
                    : movie.original_name + "_image"
                }
                component="img"
                image={`${baseUrl}/${fileSize}/${movie.poster_path}`}
              />
            </Box>
          </Card>
        </Box>
      );
    } else {
      return (
        <>
          <Box key={movie.id} m={1} height="100%" id="movie-container">
            <Card
              sx={{
                width: "20vw",
                transition: "width 0.5s ease-out",
                "&:hover": {
                  width: "22vw",
                  border: "2px solid white",
                  transition: "width 0.5s ease-in",
                },
              }}
              raised
            >
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  alt={
                    movie.original_title
                      ? movie.original_title
                      : movie.original_name + "_image"
                  }
                  component="img"
                  image={`${baseUrl}/${fileSize}/${movie.poster_path}`}
                />
              </Box>
            </Card>
          </Box>
        </>
      );
    }
  });
};
