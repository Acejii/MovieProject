import React from "react";
import "./banner.scss";
import { useSelector } from "react-redux";

const Banner = () => {
  const { banners } = useSelector((state) => state.banner);

  return (
    <div>
      {banners.map((banner) => (
        <div className="img">
          <img src={banner.hinhAnh} alt="banner" />
        </div>
      ))}
    </div>
  );
};

export default Banner;
