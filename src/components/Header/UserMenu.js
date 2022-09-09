import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { logout } from "modules/Auth/slices/authSlice";

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  notification.config({
    placement: "top",
  });

  const handleSignOut = () => {
    notification.success({
      message: "Đăng xuất thành công",
    });
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="user">
      <Link to="/profile" className="user__item">
        Tài khoản
      </Link>
      <button className="user__item" onClick={handleSignOut}>
        Đăng xuất
      </button>
    </div>
  );
};

export default UserMenu;
