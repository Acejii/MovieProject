import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./cinema.scss";
import moment from "moment/moment";
import alert from "ultils/alert/alert";
const MovieList = ({ cinema }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleClickMovieShowTime = (showtimeId) => {
    if (!user) {
      alert("Bạn chưa đăng nhập", "Bạn có muốn quay lại để đăng nhập", () =>
        navigate("/account/login")
      );
    } else {
      navigate(`ticket/${showtimeId}`);
    }
  };
  return (
    <div className="movie__item__wrapper">
      {cinema?.danhSachPhim?.map((movie, index) => (
        <div key={index} className="movie__item">
          <Link to={`/movie/${movie.maPhim}`} className="movie__image">
            <img src={movie.hinhAnh} alt="movieImage" />
          </Link>
          <div className="movie__showtime">
            <Link to={`/movie/${movie.maPhim}`} className="movie__name">
              <p className="theater">C22</p>
              <p className="name">{movie.tenPhim}</p>
            </Link>
            <div className="show__time">
              {movie.lstLichChieuTheoPhim
                ?.slice(0, 4)
                .map((showtime, index) => (
                  <div key={index} className="showtime__item">
                    <button
                      onClick={() =>
                        handleClickMovieShowTime(showtime.maLichChieu)
                      }
                    >
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
                    </button>
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
