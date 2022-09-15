import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import "./cinema.scss";
import MovieList from "./MovieList";

const { TabPane } = Tabs;

const CinemaTheater = ({ cinemaId }) => {
  const [placement, setPlacement] = useState("left");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 992) {
        setPlacement("top");
      } else {
        setPlacement("left");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    const width = window.innerWidth;
    console.log(width);
    if (width < 992) {
      setPlacement("top");
    } else {
      setPlacement("left");
    }
  }, []);

  const { data: cinemas } = useRequest(() =>
    movieAPI.getShowTimeFromCinemaSystem(cinemaId)
  );

  return (
    <>
      <Tabs tabPosition={placement}>
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
