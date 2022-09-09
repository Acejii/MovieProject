import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import alert from "ultils/alert/alert";
import moment from "moment";

const Cinema = ({ cinemas }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleClickMovieShowTime = (showtimeId) => {
    if (!user) {
      alert("Bạn chưa đăng nhập", "Bạn có muốn quay lại để đăng nhập", () =>
        navigate("/account/login")
      );
    } else {
      navigate(`/ticket/${showtimeId}`);
    }
  };
  return (
    <>
      {cinemas.map((cinema) => (
        <div key={cinema.tenCumRap} className="cinema__wrapper">
          <div className="cinema__branch">
            <div className="cinema__branch__item">
              <h3>{cinema.tenCumRap}</h3>
              <p>{cinema.diaChi}</p>
            </div>
          </div>
          <div className="cinema__showtime">
            {cinema.lichChieuPhim.map((showtime) => (
              <button
                onClick={() => handleClickMovieShowTime(showtime.maLichChieu)}
                key={showtime.maLichChieu}
                className="cinema__showtime__container"
              >
                <div className="cinema__showtime__item">
                  <span className="day">
                    {moment(showtime.ngayChieuGioChieu.slice(0, 10)).format(
                      "DD/MM"
                    )}
                  </span>
                  <span className="divide">~</span>
                  <span className="time">
                    {showtime.ngayChieuGioChieu.slice(-5)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Cinema;
