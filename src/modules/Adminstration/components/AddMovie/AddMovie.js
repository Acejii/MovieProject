import React from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../UserForm";
import "./addMovie.scss";

const AddMovie = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="addMovie__header">
        <div className="movie__title">Thêm phim mới</div>
        <div className="movie__add">
          <button
            className="addMovie__btn"
            onClick={() => navigate("/admin/movie/")}
          >
            Danh sách phim
          </button>
        </div>
      </div>

      {/* Form */}
      <UserForm />
    </>
  );
};

export default AddMovie;
