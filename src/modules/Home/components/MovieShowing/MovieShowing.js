import React, { useState } from "react";
import "./movieShowing.scss";
import MovieItem from "./MovieItem";
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import { useEffect } from "react";
import Loading from "components/Loading";

const MovieShowing = () => {
  const [type, setType] = useState("dangChieu");

  const { data: movies, isLoading } = useRequest(() =>
    movieAPI.getMovies(type)
  );

  const moviesByType = movies?.filter((movie) => movie[type] === true);

  const handleClickTitle = (e, movieType) => {
    const titleHeading = document.querySelector(".title-item.active");
    titleHeading.classList.remove("active");
    e.target.classList.add("active");

    setType(movieType);
  };

  return (
    <div className="movieshow__wrapper">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="title">
            <h4
              className="title-item active"
              onClick={(e) => handleClickTitle(e, "dangChieu")}
            >
              Đang chiếu
            </h4>
            <h4
              className="title-item"
              onClick={(e) => handleClickTitle(e, "sapChieu")}
            >
              Sắp chiếu
            </h4>
          </div>

          <div className="movie-list">
            <MovieItem movies={moviesByType} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieShowing;
