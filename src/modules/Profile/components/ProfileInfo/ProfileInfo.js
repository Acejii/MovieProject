import React, { useReducer } from "react";
import { Skeleton } from "antd";
import useRequest from "hooks/useRequest";
import profileAPI from "apis/profileAPI";
import ProfileEditModal from "../ProfileEditModal";
import "./profileInfo.scss";

const ProfileInfo = () => {
  const [x, forceUpdate] = useReducer((x) => x + 1, 0);
  const onReload = () => {
    forceUpdate();
  };

  const { data: info, isLoading } = useRequest(() => profileAPI.profileInfo(), {
    isManual: false,
    deps: [x],
  });

  return (
    <div className="profile__info__wrapper">
      {isLoading ? (
        <div style={{ padding: "20px 0" }}>
          <Skeleton active loading />
        </div>
      ) : (
        <>
          <div className="profile__info">
            <div className="profile__info__item">
              <p className="field">Họ tên</p>
              <p className="content">{info?.hoTen}</p>
            </div>
            <div className="profile__info__item">
              <p className="field">Tài khoản</p>
              <p className="content">{info?.taiKhoan}</p>
            </div>
            <div className="profile__info__item">
              <p className="field">Email</p>
              <p className="content">{info?.email}</p>
            </div>
            <div className="profile__info__item">
              <p className="field">Mật khẩu</p>
              <p className="content">{info?.matKhau}</p>
            </div>
            <div className="profile__info__item">
              <p className="field">Số điện thoại</p>
              <p className="content">{info?.soDT}</p>
            </div>
          </div>
          <div className="profile__info__edit">
            <ProfileEditModal info={info} onReload={onReload} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
