import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineMenu } from "react-icons/ai";
import "./menu.scss";
import { publicRoutes } from "routes/routes";

const Menu = () => {
  const toggleMenu = () => {
    const toggle = document.querySelector(".menu__modal");
    toggle.classList.toggle("active");
  };

  return (
    <>
      <div className="menu__icon" onClick={toggleMenu}>
        <AiOutlineMenu fontSize={32} />
      </div>
      <div className="menu__modal">
        <div className="menu__content">
          {publicRoutes.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="menu__content__item"
              onClick={toggleMenu}
            >
              {item.title?.toUpperCase()}
            </NavLink>
          ))}
        </div>

        <div className="menu__cancel" onClick={toggleMenu}>
          <ImCancelCircle fontSize="32px" />
        </div>
      </div>
    </>
  );
};
export default Menu;
