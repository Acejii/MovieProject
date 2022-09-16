import React from "react";
import { NavLink } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineMenu } from "react-icons/ai";
import "./menu.scss";
import { publicRoutes } from "routes/routes";

const Menu = () => {
  const openMenu = () => {
    const menu = document.querySelector(".menu__modal");
    menu.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  const cancelMenu = () => {
    const menu = document.querySelector(".menu__modal");
    menu.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="menu__icon" onClick={openMenu}>
        <AiOutlineMenu fontSize={32} />
      </div>
      <div className="menu__modal">
        <div className="menu__content">
          {publicRoutes.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="menu__content__item"
              onClick={cancelMenu}
            >
              {item.title?.toUpperCase()}
            </NavLink>
          ))}
        </div>

        <div className="menu__cancel" onClick={cancelMenu}>
          <ImCancelCircle fontSize="32px" />
        </div>
      </div>
    </>
  );
};
export default Menu;
