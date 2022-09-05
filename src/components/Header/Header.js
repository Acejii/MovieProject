import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { publicRoutes } from "../../routes/routes";
import { useSelector } from "react-redux";
import { Avatar, Dropdown } from "antd";
import "./header.scss";
import logo from "../../assets/img/logo.png";
import UserMenu from "./UserMenu";

const Header = () => {
  const headerRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const userRender = user?.taiKhoan.slice(0, 1);

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
        <div className="left">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="header__nav">
            {publicRoutes.map((item, index) => (
              <NavLink to={item.path} key={index} className="header__nav-item">
                {item.title?.toUpperCase()}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="right">
          {user ? (
            <Dropdown placement="bottomRight" overlay={<UserMenu />}>
              <div className="user__avatar">
                <Avatar className="avatar" size="medium">
                  {userRender.toUpperCase()}
                </Avatar>
                <p>{user?.taiKhoan}</p>
              </div>
            </Dropdown>
          ) : (
            <>
              <Link to="/account/login">Đăng nhập</Link>
              <Link to="/account/signup">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
