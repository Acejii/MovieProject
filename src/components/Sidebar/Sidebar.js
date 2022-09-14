import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiMovie } from "react-icons/bi";
import { BsCalendarWeek } from "react-icons/bs";

import "./sidebar.scss";
import logo from "assets/img/logo.png";
import { Link, NavLink } from "react-router-dom";

const navList = [
  { title: "Người dùng", icon: <AiOutlineUser />, path: "/admin/" },
  { title: "Phim", icon: <BiMovie />, path: "/admin/movie" },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar__logo">
        <img src={logo} alt="logo" />
      </Link>

      <div className="sidebar__nav">
        {navList.map((item, index) => (
          <NavLink key={index} to={item.path} className="sidebar__nav-item">
            <div className="sidebar__nav-inner">
              <div className="sidebar__nav-icon">{item.icon}</div>
              <div className="sidebar__nav-title">{item.title}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
