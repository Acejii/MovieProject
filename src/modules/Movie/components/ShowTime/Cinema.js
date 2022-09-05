import React from "react";
import moment from "moment";

const Cinema = ({ cinemas }) => {
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
              <div
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
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Cinema;
