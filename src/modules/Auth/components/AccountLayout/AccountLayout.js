import React from "react";
import Login from "modules/Auth/page/Login";
import Signup from "modules/Auth/page/Signup";
import { useParams } from "react-router-dom";
import background from "assets/img/backgroundaccount.jpg";
import "./accountLayout.scss";

const AccountLayout = () => {
  const { status } = useParams();
  return (
    <div className="account">
      <div className="account__wrapper container">
        <div className="account__fill">
          {status === "login" ? (
            <Login />
          ) : status === "signup" ? (
            <Signup />
          ) : (
            ""
          )}
        </div>
        <div className="account__background">
          <img src={background} alt="background" />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
