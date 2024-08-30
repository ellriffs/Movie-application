import { RenderCard } from "../helpers/RenderCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requests } from "../../requests/requests";
import axios from "../../config/axios.config";
import { fetchConfig } from "../../redux/slice/configurationSlice";

export const TopShows = () => {
  const dispatch = useDispatch();
  const [topShows, setTopShows] = useState([]);
  const { initialPage } = useSelector((state) => state.shows);

  useEffect(() => {
    const fetchTopShows = async (page) => {
      const request = await axios.get(
        requests.topWeeklyShows + `&page=${page}`
      );
      setTopShows((prev) => [...prev, ...request.data.results]);
      return request.data;
    };
    fetchTopShows(initialPage);
    dispatch(fetchConfig());
  }, [dispatch, initialPage]);

  return <RenderCard array={topShows} />;
};
