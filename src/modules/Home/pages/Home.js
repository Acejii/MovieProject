import React from "react";
import { useEffect } from "react";
import Banner from "../components/Banner/Banner";
import Cinema from "../components/Cinema/Cinema";
import MovieShowing from "../components/MovieShowing/MovieShowing";
import MovieFiter from "../components/MovieFilter/MovieFilter";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Banner />
      <MovieFiter />
      <MovieShowing />
      <Cinema />
    </div>
  );
};

export default Home;
