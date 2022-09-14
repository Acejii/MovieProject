import React, { useState } from "react";
import "./carousel.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import VideoModal from "../VideoModal/VideoModal";
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import Loading from "components/Loading";

const MOVIE_TRAILER = [
  "https://www.youtube.com/embed/uqJ9u7GSaYM",
  "https://www.youtube.com/embed/kBY2k3G6LsM",
  "https://www.youtube.com/embed/_rUC3-pNLyc",
];

const Carousel = () => {
  const { data, isLoading } = useRequest(() => movieAPI.getBanners());

  const [openTrailer, setOpenTrailer] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const banners = data?.map((item, index) => {
    return { ...item, trailer: MOVIE_TRAILER[index] };
  });
  const handleClickTrailer = (index) => {
    const trailerSelected = banners[index].trailer;
    setTrailer(trailerSelected);
    setOpenTrailer(true);
  };

  return (
    <div className="carousel__wrapper">
      {isLoading ? (
        <Loading />
      ) : (
        <Swiper
          speed={1000}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {banners?.map((banner, index) => (
            <SwiperSlide key={index}>
              <img src={banner.hinhAnh} alt="banner" />
              <div className="play-icon">
                <i
                  className="bx bx-play-circle bx-burst bx-border-circle"
                  onClick={() => handleClickTrailer(index)}
                ></i>
              </div>
            </SwiperSlide>
          ))}

          <VideoModal
            trailer={trailer}
            open={openTrailer}
            setOpen={setOpenTrailer}
          />
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;
