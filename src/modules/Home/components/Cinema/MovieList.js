import React from "react";
import { Link } from "react-router-dom";
import "./cinema.scss";
import moment from "moment/moment";
const MovieList = ({ cinema }) => {
  return (
    <div className="movie__item__wrapper">
      {cinema?.danhSachPhim?.map((movie, index) => (
        <div key={index} className="movie__item">
          <div className="movie__image">
            <img src={movie.hinhAnh} alt="movieImage" />
          </div>
          <div className="movie__showtime">
            <div className="movie__name">
              <p className="theater">C22</p>
              <p className="name">{movie.tenPhim}</p>
            </div>
            <div className="show__time">
              {movie.lstLichChieuTheoPhim
                ?.slice(0, 4)
                .map((showtime, index) => (
                  <div key={index} className="showtime__item">
                    <Link to={`ticket/${showtime.maLichChieu}`}>
                      <div className="showtime__item__day">
                        <p className="day">
                          {moment(
                            showtime.ngayChieuGioChieu.slice(0, 10)
                          ).format("DD/MM")}
                        </p>
                        <p className="divide">~</p>
                        <p className="time">
                          {showtime.ngayChieuGioChieu.slice(-8, -3)}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
