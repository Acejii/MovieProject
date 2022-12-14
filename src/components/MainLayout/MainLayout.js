import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="header__height"></div>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
