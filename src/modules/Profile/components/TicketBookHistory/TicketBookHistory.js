import React from "react";
import moment from "moment/moment";
import "./ticketBookHistory.scss";

const TicketBookHistory = ({ tickets }) => {
  return (
    <div className="history">
      {tickets && tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <div key={index} className="history__item">
            <div className="history__item__wrapper">
              <div className="history__item__img">
                <img src={ticket.hinhAnh} alt="movieImg" />
              </div>

              <div className="history__item__info">
                {/* name */}
                <div className="history__item__info-item">
                  <h3 className="name">{ticket.tenPhim}</h3>
                </div>
                {/* Thời lượng phim */}
                <div className="history__item__info-item">
                  <h3 className="field">Thời lượng</h3>
                  <p className="content">{`${ticket.thoiLuongPhim} phút`}</p>
                </div>

                {/* Rạp */}
                <div className="history__item__info-item">
                  <h3 className="field">Rạp</h3>
                  <p className="content">
                    {ticket.danhSachGhe.map((seat) => seat.tenHeThongRap)[0]}
                  </p>
                </div>

                {/*Ngày đặt  */}
                <div className="history__item__info-item">
                  <h3 className="field">Ngày đặt</h3>
                  <p className="content">{`${moment(
                    ticket.ngayDat.slice(0, 10)
                  ).format("DD/MM/YYYY")} - ${ticket.ngayDat.slice(
                    11,
                    16
                  )}`}</p>
                </div>

                {/* Vị trí ghế */}
                <div className="history__item__info-item">
                  <h3 className="field">Ghế số</h3>
                  <p className="content">
                    {ticket.danhSachGhe.map((seat) => seat.tenGhe).join(" - ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div style={{ color: "#fff" }}>Bạn chưa đặt vé xem phim nào!</div>
      )}
    </div>
  );
};

export default TicketBookHistory;
