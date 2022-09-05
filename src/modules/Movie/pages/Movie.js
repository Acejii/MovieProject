import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import OverView from "../components/OverView";
import ShowTime from "../components/ShowTime";
import "./movie.scss";

const Movie = () => {
  const { movieId } = useParams();
  const scrollRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="movie__wrapper container">
      <div>
        <OverView movieId={movieId} scrollRef={scrollRef} />
      </div>
      <div ref={scrollRef}>
        <ShowTime movieId={movieId} />
      </div>
    </div>
  );
};

export default Movie;
