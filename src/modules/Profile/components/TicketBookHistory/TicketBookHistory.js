import React from "react";
import moment from "moment/moment";
import "./ticketBookHistory.scss";
import useRequest from "hooks/useRequest";
import profileAPI from "apis/profileAPI";
import { Skeleton } from "antd";

const TicketBookHistory = () => {
  const { data, isLoading } = useRequest(() => profileAPI.profileInfo());
  const tickets = data?.thongTinDatVe;

  return (
    <div className="history">
      {isLoading ? (
        <div style={{ padding: "20px 0" }}>
          <Skeleton loading active />
        </div>
      ) : (
        <>
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
                      <p className="name">{ticket.tenPhim}</p>
                    </div>
                    {/* Thời lượng phim */}
                    <div className="history__item__info-item">
                      <p className="field">Thời lượng</p>
                      <p className="content">{`${ticket.thoiLuongPhim} phút`}</p>
                    </div>

                    {/* Rạp */}
                    <div className="history__item__info-item">
                      <p className="field">Rạp</p>
                      <p className="content">
                        {
                          ticket.danhSachGhe.map(
                            (seat) => seat.tenHeThongRap
                          )[0]
                        }
                      </p>
                    </div>

                    {/*Ngày đặt  */}
                    <div className="history__item__info-item">
                      <p className="field">Ngày đặt</p>
                      <p className="content">{`${moment(
                        ticket.ngayDat.slice(0, 10)
                      ).format("DD/MM/YYYY")} - ${ticket.ngayDat.slice(
                        11,
                        16
                      )}`}</p>
                    </div>

                    {/* Vị trí ghế */}
                    <div className="history__item__info-item">
                      <p className="field">Ghế số</p>
                      <p className="content">
                        {ticket.danhSachGhe
                          .map((seat) => seat.tenGhe)
                          .join(" - ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: "#fff" }}>Bạn chưa đặt vé xem phim nào!</div>
          )}
        </>
      )}
    </div>
  );
};

export default TicketBookHistory;
