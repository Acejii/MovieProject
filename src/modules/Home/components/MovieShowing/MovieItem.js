import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./movieShowing.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import VideoModal from "../VideoModal/VideoModal";

function MovieItem({ movies }) {
  const [trailer, setTrailer] = useState(null);
  const [openTrailer, setOpenTrailer] = useState(false);
  const handlePlayTrailer = (trailer) => {
    const trailerSelected = movies.find((movie) => movie.trailer === trailer);
    setTrailer(trailerSelected.trailer);
    setOpenTrailer(true);
  };

  const navigate = useNavigate();
  const handleClickDetail = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleClickBuyTicket = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Swiper
      speed={500}
      slidesPerView={"auto"}
      spaceBetween={20}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={index} className="movie-item">
          <div className="movie-image">
            <img src={movie.hinhAnh} alt="anh" />

            <div className="movie-overlay">
              <div className="buy-ticket-btn">
                <button
                  className="btn btn-primary"
                  onClick={() => handleClickBuyTicket(movie.maPhim)}
                >
                  Mua vé
                </button>
              </div>
              <div className="movie-footer-btn">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleClickDetail(movie.maPhim)}
                >
                  Chi tiết
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePlayTrailer(movie.trailer)}
                >
                  Trailer
                </button>
              </div>
            </div>
          </div>
          <div className="main">
            <Link to="/" className="main-name">
              {movie.tenPhim}
            </Link>
            <p className="main-comment">{movie.danhGia} lượt đánh giá</p>
          </div>
        </SwiperSlide>
      ))}

      <VideoModal
        trailer={trailer}
        open={openTrailer}
        setOpen={setOpenTrailer}
      />
    </Swiper>
  );
}

export default MovieItem;
