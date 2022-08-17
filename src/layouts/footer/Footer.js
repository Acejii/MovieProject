import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

const footerInfo = [
  {
    title: "general",
    content: [
      { item: "VIP", path: "/" },
      { item: "IMAX", path: "/" },
      { item: "4DX", path: "/" },
    ],
  },
  {
    title: "who are we?",
    content: [
      { item: "About us", path: "/" },
      { item: "FAQ", path: "/" },
      { item: "Careers", path: "/" },
    ],
  },
  {
    title: "legal",
    content: [
      { item: "Privacy policies", path: "/" },
      { item: "Terms and conditions", path: "/" },
    ],
  },
  {
    title: "contact us",
    content: [
      { item: "Feedback", path: "/" },
      { item: "Sales & bulk booking enquiries", path: "/" },
      { item: "Recover Email Confirmation", path: "/" },
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
      </div>
    </div>
  );
};

export default Footer;
