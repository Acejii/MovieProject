import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import CinemaTheater from "./CinemaTheater";
import "./cinema.scss";
import Loading from "components/Loading";

const { TabPane } = Tabs;
const Cinema = () => {
  const { data: cinemaSystems, isLoading } = useRequest(() =>
    movieAPI.getCinemaSystem()
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="cinemas__wrapper container">
          <h1 className="cinema__heading">HỆ THỐNG RẠP TRÊN TOÀN QUỐC</h1>
          <div className="cinema__border">
            <Tabs tabPosition="left">
              {cinemaSystems?.map((cinemaSystem, index) => (
                <TabPane
                  tab={
                    cinemaSystem.logo && (
                      <div className="cinemaSystem__tab">
                        <img
                          src={cinemaSystem.logo}
                          alt="System Cinema Logo"
                          className="cinema__logo"
                        />
                      </div>
                    )
                  }
                  key={index}
                >
                  <CinemaTheater cinemaId={cinemaSystem.maHeThongRap} />
                </TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default Cinema;
