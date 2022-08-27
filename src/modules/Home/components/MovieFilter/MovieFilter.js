import React from "react";
import { useState } from "react";
import "./movieFilter.scss";

const MovieFilter = () => {
  const [values, setValues] = useState({
    name: "",
    theater: "",
    day: "",
    hour: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="form-wrapper container">
      <form className="form-group">
        <select
          name="name"
          id="name"
          className="form-coltrol name-form"
          value={values.name}
          onChange={handleChange}
        >
          <option value="">Chọn phim</option>
          <option value="1">Chọn phim</option>
          <option value="2">Chọn phim</option>
        </select>
        <select
          name="theater"
          id="theater"
          className="form-coltrol theater-form"
          value={values.theater}
          onChange={handleChange}
        >
          <option value="">Chọn rạp</option>
          <option value="1">Chọn rạp</option>
          <option value="2">Chọn rạp</option>
        </select>
        <select
          name="day"
          id="day"
          className="form-coltrol day-form"
          value={values.day}
          onChange={handleChange}
        >
          <option value="">Ngày</option>
          <option value="1">Ngày</option>
          <option value="2">Ngày</option>
        </select>
        <select
          name="hour"
          id="hour"
          className="form-coltrol hour-form"
          value={values.hour}
          onChange={handleChange}
        >
          <option value="">Giờ</option>
          <option value="1">Giờ</option>
          <option value="2">Giờ</option>
        </select>

        <button className="button-controll">Đặt vé</button>
      </form>
    </div>
  );
};

export default MovieFilter;
