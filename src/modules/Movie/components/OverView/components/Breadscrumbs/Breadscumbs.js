import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import "./breadscrumbs.scss";
const Breadscumbs = ({ movie }) => {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="none" color="inherit" href="/">
          <h2 className="breadcrumbs__home">Home</h2>
        </Link>
        <div>
          <h2 className="breadcrumbs__item">{movie?.tenPhim}</h2>
        </div>
      </Breadcrumbs>
    </div>
  );
};

export default Breadscumbs;
