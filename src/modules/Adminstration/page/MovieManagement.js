import React, { useState } from "react";

import "./movieManagement.scss";
import { Outlet } from "react-router-dom";

const MovieManagement = () => {
  return (
    <div className="movie__manager">
      <div className="movie__title">
        <p>Quản lý phim</p>
      </div>

      <div className="movie__content">
        <Outlet />
      </div>
    </div>
  );
};

export default MovieManagement;
