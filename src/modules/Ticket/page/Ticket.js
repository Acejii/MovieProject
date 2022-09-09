import ticketAPI from "apis/ticketAPI";
import useRequest from "hooks/useRequest";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Seat from "../components/Seat";
import TicketTitle from "../components/TicketTitle";

import "./ticket.scss";

const Ticket = () => {
  // load trang sẽ hiển thị trên đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { showtimeId } = useParams();

  const {
    data: movie,
    isLoading,
    error,
  } = useRequest(() => ticketAPI.getTicketRoom(showtimeId));

  return (
    <div className="ticket">
      <div className="ticket__wrapper container">
        {/* title */}
        <TicketTitle movieInfo={movie?.thongTinPhim} />

        {/* main */}

        <div className="ticket__seat">
          <Seat seats={movie?.danhSachGhe} />
        </div>
      </div>
    </div>
  );
};

export default Ticket;
