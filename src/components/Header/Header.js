import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { publicRoutes } from "../../routes/routes";
import "./header.scss";
import logo from "../../assets/img/logo.png";

const Header = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const handleShrink = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", handleShrink);

    return () => {
      window.removeEventListener("scroll", handleShrink);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header__nav">
          {publicRoutes.map((item, index) => (
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
