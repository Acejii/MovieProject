import React from "react";
import "./ticketTitle.scss";

const TicketTitle = ({ movieInfo }) => {
  return (
    <div className="ticket__title">
      <div className="ticket__title__info">
        <div className="ticket__title__info-img">
          <img src={movieInfo?.hinhAnh} alt="MovieInfoImg" />
        </div>
        <div className="ticket__title__info-main">
          <div className="ticket__title__info-item">
            <h4 className="item-title">{movieInfo?.tenPhim}</h4>
          </div>
          <div className="ticket__title__info-item">
            <h4 className="item-title">Thông tin rạp: </h4>
            <p className="content">2D</p>
          </div>
          <div className="ticket__title__info-item">
            <h4 className="item-title">khuyến nghị: </h4>
            <p className="content">Mọi lứa tuổi</p>
          </div>
        </div>

        <div className="ticket__title__info-main">
          <div className="ticket__title__info-item">
            <h4 className="item-title">Rạp chiếu: </h4>
            <p className="content">{movieInfo?.tenCumRap}</p>
          </div>
          <div className="ticket__title__info-item">
            <h4 className="item-title">Phòng:</h4>
            <p className="content">{movieInfo?.tenRap}</p>
          </div>

          <div className="ticket__title__info-item">
            <h4 className="item-title">Giờ chiếu:</h4>
            <p className="content">
              {movieInfo?.gioChieu} ~ {movieInfo?.ngayChieu}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketTitle;
