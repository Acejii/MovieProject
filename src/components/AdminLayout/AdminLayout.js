import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "components/Sidebar";
import { IoNotificationsOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { Avatar, Dropdown, Badge } from "antd";
import avatar from "assets/img/avatar.jpg";

import "./adminLayout.scss";
import UserMenu from "components/Header/UserMenu";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="admin">
      <div className="admin__sidebar">
        <Sidebar />
      </div>

      <div className="admin__content">
        <div className="admin__content__topNav">
          <div className="name">
            <Dropdown placement="bottomLeft" overlay={<UserMenu />}>
              <div className="user__avatar">
                <Avatar className="avatar" size="medium" src={avatar}></Avatar>
                <p>{user?.taiKhoan}</p>
              </div>
            </Dropdown>
          </div>
          <div className="noti">
            <Badge count={5} size="small">
              <IoNotificationsOutline size="24px" color="black" />
            </Badge>
          </div>
        </div>
        <div className="admin__content__outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
