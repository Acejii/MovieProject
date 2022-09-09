import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImBin } from "react-icons/im";

import "./seat.scss";
import screen from "assets/img/screen.png";
import { useEffect } from "react";
import { notification } from "antd";
import alert from "ultils/alert/alert";
import useRequest from "hooks/useRequest";
import ticketAPI from "apis/ticketAPI";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const Seat = ({ seats }) => {
  notification.config({
    placement: "top",
  });

  const { showtimeId } = useParams();
  const navigate = useNavigate();

  const [newSeats, setNewSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  let count = 0;
  useEffect(() => {
    const handleData = async () => {
      if (seats && seats.length > 0) {
        const seatItem = await seats.map((seat) => {
          count++;
          if (count > 16) {
            count = 1;
          }
          return { ...seat, count, dangChon: false };
        });
        setNewSeats(seatItem);
      }
    };

    handleData();
  }, [seats]);

  const handleSelectSeat = (seatSelected) => {
    if (bookedSeats && bookedSeats.length > 0 && bookedSeats.length <= 10) {
      const index = bookedSeats.findIndex(
        (seat) => seat.maGhe === seatSelected.maGhe
      );
      if (index === -1) {
        if (bookedSeats.length > 9) {
          notification.error({
            message: "Chỉ được đặt tối đa 10 vé",
          });
          return;
        }
        // set active ghế đang chọn
        seatSelected.dangChon = true;

        //setState cart
        setBookedSeats((state) => [...state, seatSelected]);
      } else {
        // set active ghế bỏ chọn
        seatSelected.dangChon = false;
        const newBookedSeat = bookedSeats.filter(
          (bookedSeat) => bookedSeat !== bookedSeats[index]
        );
        setBookedSeats(newBookedSeat);
      }
    } else {
      seatSelected.dangChon = true;
      setBookedSeats((state) => [...state, seatSelected]);
    }
  };

  const handleRemoveSeat = (seat) => {
    seat.dangChon = false;
    const newBookedSeats = bookedSeats?.filter(
      (bookedSeat) => bookedSeat.maGhe !== seat.maGhe
    );

    setBookedSeats(newBookedSeats);
  };

  const handleDeleteAllSeat = () => {
    bookedSeats.map((seat) => (seat.dangChon = false));
    setBookedSeats([]);
  };

  // Request
  const { data: handleBookTicket, isLoading } = useRequest(
    (values) => ticketAPI.bookTicket(values),
    { isManual: true }
  );

  const handleClickBookSeat = async () => {
    let values = {
      maLichChieu: null,
      danhSachVe: [],
    };
    if (bookedSeats && bookedSeats.length > 0) {
      const newBookedSeats = bookedSeats.map((seat) => {
        return { maGhe: seat.maGhe, giaVe: seat.giaVe };
      });

      values = {
        ...values,
        maLichChieu: showtimeId,
        danhSachVe: newBookedSeats,
      };

      const onSuccess = async () => {
        try {
          await handleBookTicket(values);
          // reset form
          await handleDeleteAllSeat();
          // notification
          await notification.success({
            message: "Đặt vé thành công!",
            description:
              "Bạn có thể xem lịch sử đặt vé trong thông tin cá nhân",
          });
          //chuyển hướng về trang chủ
          navigate("/");
        } catch (error) {
          notification.error({
            message: "Đặt vé thất bại",
            description: error,
          });
        }
      };
      // alert thông báo có chấp nhận đặt vé
      alert(
        "Bạn có chấp nhận đặt vé không?",
        "Vé đã đặt không thể hoàn lại",
        onSuccess
      );
    }
  };
  return (
    <div className="seat">
      {/* booked seat */}
      <div className="seat__book">
        {/* screen */}
        <div className="seat__screen">
          <img src={screen} alt="screen" />

          {/* seat list */}
        </div>
        <div className="seat__list">
          <div className="seat__list-range">
            {rows.map((row, index) => (
              <div key={index} className="seat__list-range-item">
                <div key={index} className="row">
                  {row}
                </div>
              </div>
            ))}
          </div>
          <div className="seat__list-row">
            {newSeats?.map((seat, index) => (
              <div key={index} className="seat__list-row-item">
                <div
                  className={`row ${
                    seat.loaiGhe === "Thuong" ? "normal" : ""
                  } ${seat.loaiGhe === "Vip" ? "vip" : ""} ${
                    seat.daDat ? "selected" : ""
                  } ${seat.dangChon ? "seat-active" : ""}`}
                  onClick={() => handleSelectSeat(seat)}
                >
                  {seat.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* description */}
        <div className="seat__description">
          <div className="row">
            <div className="square checked"></div>
            <p>Checked</p>
          </div>
          <div className="row">
            <div className="square selected"></div>
            <p>Đã chọn</p>
          </div>
          <div className="row">
            <div className="square notallow">X</div>
            <p>Không thể chọn</p>
          </div>
          <div className="row">
            <div className="square normal"></div>
            <p>Ghế thường</p>
          </div>
          <div className="row">
            <div className="square vip"></div>
            <p>Ghế VIP</p>
          </div>
        </div>
      </div>

      {/* seat__info */}
      <div className="seat__detail">
        <h2 className="seat__detail__title">DANH SÁCH GHẾ ĐÃ CHỌN</h2>
        <div className="detail-table">
          <table width="100%">
            <thead>
              <tr>
                <th>Số ghế</th>
                <th>Giá</th>
                <th>Huỷ</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {bookedSeats &&
                bookedSeats.length > 0 &&
                bookedSeats.map((seat, index) => (
                  <tr key={index}>
                    <td>{`${seat.tenGhe} - ${
                      seat.loaiGhe === "Thuong" ? "Ghế thường" : "Ghế VIP"
                    }`}</td>
                    <td>{seat.giaVe.toLocaleString()}</td>
                    <td>
                      <button
                        className="cancel-btn"
                        onClick={() => handleRemoveSeat(seat)}
                      >
                        <ImBin size="16px" color="#fff" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {bookedSeats.length > 0 && (
          <div className="booking-footer">
            <div className="total">
              <h4>Tổng tiền:</h4>
              <p>
                {`${bookedSeats
                  .reduce((acc, curr) => acc + curr.giaVe, 0)
                  .toLocaleString()} ₫`}
              </p>
            </div>
            <div className="footer-btn">
              <button className="btn btn-danger" onClick={handleDeleteAllSeat}>
                XOÁ
              </button>
              <button className="btn btn-success" onClick={handleClickBookSeat}>
                ĐẶT VÉ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seat;
