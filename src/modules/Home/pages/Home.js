import React from "react";
import { useEffect } from "react";
import Banner from "../components/Banner/Banner";
import Cinema from "../components/Cinema/Cinema";
import MovieShowing from "../components/MovieShowing/MovieShowing";
import { useDispatch } from "react-redux";
import { getBanners } from "../slices/bannerSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanners());
  }, []);

  return (
    <div>
      <Banner />
      <Cinema />
      <MovieShowing />
    </div>
  );
};

export default Home;
