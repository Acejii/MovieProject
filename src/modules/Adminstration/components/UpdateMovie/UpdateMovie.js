import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserForm from "../UserForm";
import "./updateMovie.scss";

const UpdateMovie = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  if (!user) return;

  return (
    <>
      <div className="updateMovie__header">
        <div className="movie__title">Thêm phim mới</div>
        <div className="movie__add">
          <button
            className="updateMovie__btn"
            onClick={() => navigate("/admin/movie/")}
          >
            Danh sách phim
          </button>
        </div>
      </div>

      {/* Form */}
      <UserForm user={user} />
    </>
  );
};

export default UpdateMovie;
