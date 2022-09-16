import React, { useEffect } from "react";
import { Tabs } from "antd";
import "./profile.scss";
import ProfileInfo from "../components/ProfileInfo";
import TicketBookHistory from "../components/TicketBookHistory";

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="profile">
      <Tabs defaultActiveKey="1" className="profile__wrapper container">
        <Tabs.TabPane
          tab="Thông tin tài khoản"
          key="1"
          className="profile__tab"
        >
          <ProfileInfo />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lịch sử đặt vé" key="2" className="profile__tab">
          <TicketBookHistory />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
