import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import React from "react";
import moment from "moment";
import Rating from "@mui/material/Rating";
import Breadscumbs from "./components/Breadscrumbs/Breadscumbs";
import "./OverView.scss";
import { useState } from "react";
import VideoModal from "modules/Home/components/VideoModal/VideoModal";

const OverView = ({ movieId, scrollRef }) => {
  const {
    data: movie,
    isLoading,
    error,
  } = useRequest(() => movieAPI.getMovieDetail(movieId));

  const [openTrailer, setOpenTrailer] = useState(false);

  const handleClickTrailer = (trailer) => {
    setOpenTrailer(true);
  };

  const day = movie?.ngayKhoiChieu.slice(0, 10);
  const dayFormat = moment(day).format("DD/MM/YYYY");

  const handleScrollToShowTime = () => {
    window.scrollTo({
      top: scrollRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Begin Overview */}
      <Breadscumbs movie={movie} />
      <div className="overview">
        <div className="overview__main-img">
          <img src={movie?.hinhAnh} alt="anh" />
        </div>
        <div className="overview__main-content">
          <h1 className="name">{movie?.tenPhim}</h1>

          <div className="rate">
            <Rating
              name="read-only"
              value={movie?.danhGia / 2}
              readOnly
              max={5}
            />
          </div>

          <p className="description">{movie?.moTa}</p>

          <div className="day">
            <span className="day-title">Ngày khởi chiếu</span>
            <span className="day-content">{dayFormat}</span>
          </div>

          <div className="time">
            <span className="time-title">Thời gian</span>
            <span className="time-content">120 phút</span>
          </div>

          <div className="type">
            <span className="type-title">Loại</span>
            <span className="type-content">2D/Nomal/Phụ đề tiếng Anh</span>
          </div>
          <div className="overview__main-btn">
            <button
              className="btn btn-primary overview__btn"
              onClick={handleScrollToShowTime}
            >
              Đặt vé
            </button>
            <button
              className="btn btn-primary overview__btn"
              onClick={() => handleClickTrailer(movie.trailer)}
            >
              Trailer
            </button>
          </div>
        </div>
      </div>

      <VideoModal
        trailer={movie?.trailer}
        open={openTrailer}
        setOpen={setOpenTrailer}
      />
      {/* End OverView */}
    </>
  );
};

export default OverView;
