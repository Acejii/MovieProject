import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";
import appstore from "assets/img/appstore-logo.png";
import googleplay from "assets/img/googleplay-logo.png";

const SocialMedia = () => {
  return (
    <div className="social__wrapper">
      <i className="bx bxl-facebook-square icon"></i>
      <i className="bx bxl-youtube icon"></i>
      <i className="bx bxl-instagram icon"></i>
      <i className="bx bxl-tiktok icon"></i>
    </div>
  );
};

const AppDownload = () => {
  return (
    <div className="app__wrapper">
      <h1 className="footer__item-title">Tải app</h1>
      <img src={appstore} alt="anh" className="footer__app" />
      <img src={googleplay} alt="anh" className="footer__app" />
    </div>
  );
};

const footerInfo = [
  {
    title: "Về CyberCinema",
    content: [
      { item: "Giới thiệu", path: "/" },
      { item: "Tuyển dụng", path: "/" },
      { item: "Liên hệ quảng cáo", path: "/" },
    ],
  },
  {
    title: "Điều khoản",
    content: [
      { item: "Điều khoản chung", path: "/" },
      { item: "Điều khoản thanh toán", path: "/" },
      { item: "Chính sách bảo mật", path: "/" },
      { item: "Câu hỏi thường gặp", path: "/" },
    ],
  },
  {
    title: "Hỗ trợ",
    content: [
      { item: "Góp ý", path: "/" },
      { item: "Rạp & Giá vé", path: "/" },
      { item: "Khuyến mãi", path: "/" },
    ],
  },
  {
    title: "Kết nối CyberCinema",
    content: [
      { item: <SocialMedia />, path: "/" },
      { item: <AppDownload />, path: "/" },
    ],
  },
];

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__wrap container">
        {footerInfo.map((item, index) => (
          <div key={index} className="footer__item">
            <h1 className="footer__item-title">{item.title}</h1>
            {item.content.map((list, index) => (
              <div key={index} className="footer__item-list">
                <Link to={list.path} className="footer__item-item">
                  {list.item}
                </Link>
              </div>
            ))}
          </div>
        ))}
        <div className="coppyright">
          <hr width="50%" className="coppyright__line" />
          <div className="coppyright__text">
            Copyrights © 2022 by Cyber Cinema.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
