import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ShowtimeForm from "../components/ShowtimeForm";
import "./showtimeManagement.scss";

const ShowtimeManagement = () => {
  const navigate = useNavigate();
  const { state: movie } = useLocation();
  if (!movie) return;

  return (
    <>
      <div className="showtimeManage__header">
        <div className="movie__title">Thêm lịch chiếu</div>
        <div className="movie__add">
          <button
            className="showtimeManage__btn"
            onClick={() => navigate("/admin/movie/")}
          >
            Danh sách phim
          </button>
        </div>
      </div>

      <ShowtimeForm movie={movie} />
    </>
  );
};

export default ShowtimeManagement;
