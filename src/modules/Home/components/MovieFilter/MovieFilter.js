import React, { useEffect, useState } from "react";
import movieAPI from "apis/movieAPI";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import "./movieFilter.scss";

const MovieFilter = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    movies: [],
    movieIdSelected: "",
    selectedMovieShowtime: [],
    theater: "",
    cinemaSelected: null,
    showTimeId: "",
  });
  const getMovies = async () => {
    try {
      const data = await movieAPI.getMovies();
      setValues({ ...values, movies: data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    if (!values.movieIdSelected) return;
    handleSeclectedTheater(values.movieIdSelected);
  }, [values.movieIdSelected]);

  const handleSeclectedTheater = async (movieIdSelected) => {
    try {
      const data = await movieAPI.getMovieShowTime(movieIdSelected);
      setValues({
        ...values,
        selectedMovieShowtime: data.heThongRapChieu,
        theater: "",
        cinemaSelected: null,
        showTimeId: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectDay = (theater) => {
    const cinemas = values.selectedMovieShowtime?.forEach((cinemaSystem) => {
      cinemaSystem.cumRapChieu.forEach((cinema) => {
        if (cinema.maCumRap === theater) {
          setValues({ ...values, cinemaSelected: cinema });
        }
      });
    });

    // setValues({ ...values, cinemaSelected: cinemaSelected });
  };

  useEffect(() => {
    handleSelectDay(values.theater);
  }, [values.theater]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setValues({
          ...values,
          movieIdSelected: value,
        });
        break;
      case "theater":
        setValues({ ...values, theater: value });
        break;
      case "day":
        setValues({ ...values, showTimeId: value });
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`ticket/${values.showTimeId}`);
  };

  return (
    <div className="form-wrapper container">
      <div className="form__title">
        <p>Đặt vé online ngay!</p>
      </div>
      <form className="form-group" onSubmit={handleSubmit}>
        <select
          name="name"
          id="name"
          className="form-coltrol name-form"
          value={values.name}
          onChange={handleChange}
        >
          <option value="">Chọn phim</option>
          {values.movies?.map((movie) => (
            <option key={movie.maPhim} value={movie.maPhim}>
              {movie.tenPhim}
            </option>
          ))}
        </select>
        <select
          name="theater"
          id="theater"
          className="form-coltrol theater-form"
          value={values.theater}
          onChange={handleChange}
        >
          <option value="">Chọn rạp</option>
          {values.selectedMovieShowtime?.map((cinemaSystem) => {
            return cinemaSystem.cumRapChieu?.map((cinema) => {
              return (
                <option key={cinema.maCumRap} value={cinema.maCumRap}>
                  {cinema.tenCumRap}
                </option>
              );
            });
          })}
        </select>

        <select
          name="day"
          id="day"
          className="form-coltrol day-form"
          value={values.day}
          onChange={handleChange}
        >
          <option value="">Chọn thời gian</option>
          {values.cinemaSelected?.lichChieuPhim?.map((showtime) => {
            return (
              <option key={showtime.maLichChieu} value={showtime.maLichChieu}>
                {`${moment(showtime.ngayChieuGioChieu.slice(0, 10)).format(
                  "DD/MM"
                )} ~ ${showtime.ngayChieuGioChieu.slice(-8, -3)}`}
              </option>
            );
          })}
        </select>

        <button className="button-controll">Đặt vé</button>
      </form>
    </div>
  );
};

export default MovieFilter;
