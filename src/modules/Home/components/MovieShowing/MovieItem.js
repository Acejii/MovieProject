import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./movieShowing.scss";
import { Swiper, SwiperSlide } from "swiper/react";
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
    console.log(trailerSelected);
  };

  return (
    <Swiper
      speed={500}
      slidesPerView={5}
      slidesPerGroup={5}
      spaceBetween={20}
      loop={true}
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
                <button className="btn btn-primary">Mua vé</button>
              </div>
              <div className="movie-footer-btn">
                <button className="btn btn-secondary">Chi tiết</button>
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
