import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { logout } from "modules/Auth/slices/authSlice";

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
      {user.maLoaiNguoiDung === "QuanTri" ? (
        <Link to="/admin/" className="user__item">
          Quản trị viên
        </Link>
      ) : (
        ""
      )}
      <div className="user__item" onClick={handleSignOut}>
        Đăng xuất
      </div>
    </div>
  );
};

export default UserMenu;
