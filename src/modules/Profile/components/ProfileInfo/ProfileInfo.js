import React from "react";
import ProfileEditModal from "../ProfileEditModal";
import "./profileInfo.scss";

const ProfileInfo = ({ info }) => {
  return (
    <div className="profile__info__wrapper">
      <div className="profile__info">
        <div className="profile__info__item">
          <p className="field">Họ tên</p>
          <p className="content">{info.hoTen}</p>
        </div>
        <div className="profile__info__item">
          <p className="field">Tài khoản</p>
          <p className="content">{info.taiKhoan}</p>
        </div>
        <div className="profile__info__item">
          <p className="field">Email</p>
          <p className="content">{info.email}</p>
        </div>
        <div className="profile__info__item">
          <p className="field">Mật khẩu</p>
          <p className="content">{info.matKhau}</p>
        </div>
        <div className="profile__info__item">
          <p className="field">Số điện thoại</p>
          <p className="content">{info.soDT}</p>
        </div>
      </div>
      <div className="profile__info__edit">
        <ProfileEditModal info={info}/>
      </div>
    </div>
  );
};

export default ProfileInfo;
