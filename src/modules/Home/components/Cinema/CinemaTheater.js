import React from "react";
import { Tabs } from "antd";
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import "./cinema.scss";
import MovieList from "./MovieList";

const { TabPane } = Tabs;

const CinemaTheater = ({ cinemaId }) => {
  const { data: cinemas } = useRequest(() =>
    movieAPI.getShowTimeFromCinemaSystem(cinemaId)
  );

  return (
    <>
      <Tabs tabPosition="left">
        {cinemas?.map((cinema) =>
          cinema.lstCumRap?.slice(0, 6).map((cinema, index) => (
            <TabPane
              key={index}
              tab={
                cinema && (
                  <div className="cinema__tab">
                    <p className="name">{cinema.tenCumRap}</p>
                    <p className="address">{cinema.diaChi}</p>
                    <p className="detail">[Chi tiết]</p>
                  </div>
                )
              }
            >
              <MovieList cinema={cinema} />
            </TabPane>
          ))
        )}
      </Tabs>
    </>
  );
};

export default CinemaTheater;
