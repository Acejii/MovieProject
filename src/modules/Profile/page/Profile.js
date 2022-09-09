import React from "react";
import { Tabs } from "antd";
import "./profile.scss";
import ProfileInfo from "../components/ProfileInfo";
import TicketBookHistory from "../components/TicketBookHistory";
import useRequest from "hooks/useRequest";
import profileAPI from "apis/profileAPI";

const Profile = () => {
  const {
    data: profile,
    isLoading,
    error,
  } = useRequest(() => profileAPI.profileInfo());

  if (!profile) return;

  return (
    <div className="profile">
      <Tabs defaultActiveKey="1" className="profile__wrapper container">
        <Tabs.TabPane
          tab="Thông tin tài khoản"
          key="1"
          className="profile__tab"
        >
          <ProfileInfo info={profile} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lịch sử đặt vé" key="2" className="profile__tab">
          <TicketBookHistory tickets={profile?.thongTinDatVe} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
