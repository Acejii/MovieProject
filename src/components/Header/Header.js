import React, { useEffect, useRef } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { publicRoutes } from "../../routes/routes";
import { useSelector } from "react-redux";
import { Avatar, Dropdown } from "antd";
import logo from "../../assets/img/logo.png";
import avatar from "assets/img/avatar.jpg";
import UserMenu from "./UserMenu";
import Menu from "components/Menu";
import "./header.scss";

const Header = () => {
  const headerRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleShrink = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef?.current?.classList.add("shrink");
      } else {
        headerRef?.current?.classList.remove("shrink");
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
            <Link to="/" className="logo__wrapper">
              <div className="logo-img">
                <img src={logo} alt="logo" />
              </div>
              <p className="logo-title">CyberCinema</p>
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
            <Dropdown
              placement="bottom"
              overlay={<UserMenu />}
              trigger={["hover", "click"]}
            >
              <div className="user__avatar">
                <Avatar className="avatar" size="medium" src={avatar}></Avatar>
                <p>{user?.taiKhoan}</p>
              </div>
            </Dropdown>
          ) : (
            <>
              <Link to="/account/login" className="login">
                Đăng nhập
              </Link>
              <Link to="/account/signup" className="signup">
                Đăng ký
              </Link>
              <Link to="/account/login" className="icon">
                <FaUserAstronaut size={28} />
              </Link>
            </>
          )}

          {/* Button dropdown */}
          <div className="menu">
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
