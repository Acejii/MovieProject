import React from "react";
import { Link, NavLink } from "react-router-dom";
import { privateRoutes } from "../../config/routes";
import "./header.scss";
import logo from "../../assets/img/logo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">AcejiMovie</Link>
        </div>
        <div className="header__nav">
          {privateRoutes.map((item, index) => (
            <NavLink to={item.path} key={index} className="header__nav-item">
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
