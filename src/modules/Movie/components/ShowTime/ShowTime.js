import React from "react";
import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import Cinema from "./Cinema";
import "./ShowTime.scss";

const { TabPane } = Tabs;

const ShowTime = () => {
  const { movieId } = useParams();

  const { data, isLoading, error } = useRequest(() =>
    movieAPI.getMovieShowTime(movieId)
  );
  return (
    <div className="showtime">
      <div className="showtime__title">
        <h1>ĐẶT VÉ NGAY TẠI ĐÂY</h1>
      </div>
      {data && data.heThongRapChieu.length > 0 ? (
        <div className="showtime__main">
          <div className="showtime__main__cinema">
            <Tabs defaultActiveKey="1" centered>
              {data.heThongRapChieu.map((cinemaSystem) => (
                <TabPane
                  tab={
                    <div className="showtime__main__cinema__item">
                      <img
                        className="logo"
                        src={cinemaSystem.logo}
                        alt="logo"
                      />
                    </div>
                  }
                  key={cinemaSystem.maHeThongRap}
                >
                  <Cinema cinemas={cinemaSystem.cumRapChieu} />
                </TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="not__buy__show">
          <h3 className="content">Hiện chưa bán vé phim này</h3>
          <h3 className="content">Xin vui lòng quay lại sau</h3>
        </div>
      )}
    </div>
  );
};

export default ShowTime;
