import React from "react";
import { Routes, Route } from "react-router-dom";
import { privateRoutes } from "./routes";

const Router = () => {
  return (
    <Routes>
      {privateRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};

export default Router;
