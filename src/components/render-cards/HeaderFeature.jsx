import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requests } from "../../requests/requests";
import axios from "../../config/axios.config";
import { fetchConfig } from "../../redux/slice/configurationSlice";

export const HeaderFeature = () => {
  const dispatch = useDispatch();
  const [feature, setFeature] = useState([]);
  const [movieLogo, setMovieLogo] = useState([]);
  const { initialPage } = useSelector((state) => state.shows);
  const baseUrl = useSelector((state) => state.config.baseUrl);
  const fileSize = useSelector((state) => state.config.fileSize);

  const fetchMovieLogo = async (id) => {
    const request = await axios.get(
      requests.headerMovieLogo + `${id}/images?include_image_language=en`
    );
    setMovieLogo([...request.data.logos]);
    return requests.data;
  };

  useEffect(() => {
    const fetchTopShows = async (page) => {
      const request = await axios.get(
        requests.topWeeklyShows + `&page=${page}`
      );
      setFeature((prev) => [...prev, ...request.data.results]);
    };
    fetchTopShows(initialPage);
    dispatch(fetchConfig());
  }, [dispatch, initialPage]);

  useEffect(() => {
    feature.slice(18, 19).map((feat) => {
      fetchMovieLogo(feat.id);
    });
  }, [feature]);

  return feature.slice(18, 19).map((feat) => {
    return (
      <>
        <Grid width="100%" overflow="hidden" display="flex" flexGrow={1}>
          <Box
            key={feat.id[0]}
            sx={{
              backgroundImage: ` linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 5%, rgba(0, 0, 0, 1) 95%), url(${baseUrl}${fileSize}/${feat.poster_path})`,
              backgroundSize: "cover",
              height: "100vh",
              width: "100%",
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 1)",
            }}
          ></Box>
        </Grid>
        <Grid width="100%" display={"flex"} flexDirection={"column"}>
          <Box
            key={feat.id[0]}
            sx={{ height: "100vh", width: "100%", backgroundColor: "black" }}
          >
            {movieLogo.slice(0, 1).map((movie) => {
              return (
                <>
                  <Grid display={'flex'} alignItems={'center'} height={"33vh"}>
                    <Box
                      key={movie.file_path}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <img
                        style={{ margin: 10 }}
                        src={`${baseUrl}/${fileSize}${movie.file_path}`}
                        height={"100%"}
                        width={"80%"}
                      />
                    </Box>
                  </Grid>
                </>
              );
            })}
            <Grid
              m={1}
              height={"33vh"}
              width={"100%"}
            >
              <Box
                justifyContent={"center"}
                alignItems={"center"}
                display="flex"
                height={"100%"}
                width={"90%"}
                textTransform={"capitalize"}
              >
                <Typography textAlign={'center'} lineHeight={2.5} color="white">
                  {feat.overview}
                </Typography>
              </Box>
            </Grid>
            <Grid height={"33vh"}>
              <Box
                height={"33vh"}
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
              >
                <Stack
                  m={1}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-around"}
                  width={"50%"}
                >
                  <Button
                    color="error"
                    sx={{ width: "40%" }}
                    variant="contained"
                  >
                    Play
                  </Button>
                  <Button
                    color="error"
                    sx={{ width: "40%" }}
                    variant="contained"
                  >
                    Add To List
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </>
    );
  });
};
