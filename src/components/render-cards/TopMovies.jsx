import { RenderCard } from "../helpers/RenderCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfig } from "../../redux/slice/configurationSlice";
import { incrementMoviePage } from "../../redux/slice/allMoviesSlice";
import axios from "../../config/axios.config";
import { requests } from "../../requests/requests";

export const TopMovies = () => {
  const dispatch = useDispatch();
  const [topMovies, setTopMovies] = useState([]);
  const { initialPage } = useSelector((state) => state.movies);

  useEffect(() => {
    const fetchTopMovies = async (page) => {
      const request = await axios.get(requests.topWeeklyMovies+ `&page=${page}`);
      console.log(request.data)
      setTopMovies((prev) => [...prev, ...request.data.results])
      return request.data;
    };
    fetchTopMovies(initialPage);
    dispatch(fetchConfig());
  }, [initialPage, dispatch]);

  return <RenderCard array={topMovies} dispatchFunction={incrementMoviePage} />;
};
