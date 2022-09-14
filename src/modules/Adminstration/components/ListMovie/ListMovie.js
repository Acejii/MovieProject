import React, { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Space, notification, Tooltip } from "antd";
import { BiEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { AiOutlineCalendar } from "react-icons/ai";
import movieManagementAPI from "apis/movieManagementAPI";
import alert from "ultils/alert/alert";

import "./listMovie.scss";
import useRequest from "hooks/useRequest";
import Spinner from "components/Spinner";

const ListMovie = () => {
  const [value, setValue] = useState("");
  const [x, forceUpdate] = useReducer((x) => x + 1, 0);
  const onReload = () => {
    forceUpdate();
  };
  // call api get movies
  notification.config({
    placement: "top",
  });

  const navigate = useNavigate();

  const { data: movies, isLoading } = useRequest(
    () => movieManagementAPI.getMovies(value),
    { deps: [x] }
  );

  // useEffect(() => {
  //   const fetchMovies = async (value) => {
  //     try {
  //       const data = await movieManagementAPI.getMovies(value);
  //       setMovies(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchMovies(value);
  // }, [x]);

  // movie list table
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (_, record) => (
        <img width="30px" src={record.hinhAnh} alt="movieImg" />
      ),
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: "260px",
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: "450px",
      ellipsis: true,
      // render: (text) => (
      //   <p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{text}</p>
      // ),
    },

    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa" placement="top">
            <button onClick={() => handleEdit(record.movieInfo)}>
              <BiEdit size="18px" color="blue" />
            </button>
          </Tooltip>
          <Tooltip title="Xoá" placement="top">
            <button onClick={() => handleRemove(record.maPhim)}>
              <ImBin size="18px" color="red" />
            </button>
          </Tooltip>
          <Tooltip title="Tạo lịch chiếu" placement="top">
            <button onClick={() => handleCreateShowtime(record.movieInfo)}>
              <AiOutlineCalendar size="18px" color="green" />
            </button>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "movieInfo",
      dataIndex: "movieInfo",
      key: "movieInfo",
      hidden: true,
    },
  ].filter((item) => !item.hidden);

  const data = movies?.map((movie, index) => {
    return {
      key: index,
      maPhim: movie?.maPhim,
      hinhAnh: movie?.hinhAnh,
      tenPhim: movie?.tenPhim,
      moTa: movie?.moTa,
      movieInfo: movie,
    };
  });

  //Search func
  const handleSearchMovieChange = (e) => {
    setValue(e.target.value);
  };

  const handleEnterToSearch = (e) => {
    if (e.key !== "Enter") return;
    onReload();
  };

  const handleSearchByClick = () => {
    onReload();
  };

  const handleEdit = (user) => {
    navigate("/admin/movie/update", { state: user });
  };

  // delete movie
  const handleRemove = (movieId) => {
    alert("Xoá phim", "Bạn có chắc chắn muốn xoá phim này", async () => {
      try {
        await movieManagementAPI.removeMovie(movieId);
        notification.success({
          message: "Xoá thành công",
        });
        onReload();
      } catch (error) {
        notification.error({
          message: "Xoá thất bại",
          description: error,
        });
      }
    });
  };

  const handleCreateShowtime = (movie) => {
    navigate(`/admin/movie/showtime/${movie.maPhim}`, { state: movie });
  };

  return (
    <>
      <div className="list__movie__header">
        <div className="movie__title">Danh sách phim</div>
        <div className="movie__tool">
          <div className="movie__search">
            <input
              value={value}
              type="text"
              placeholder="Tìm kiếm..."
              spellCheck={false}
              onChange={handleSearchMovieChange}
              onKeyDown={handleEnterToSearch}
            />
            <div className="icon" onClick={handleSearchByClick}>
              <BsSearch color="black" />
            </div>
          </div>

          <div className="movie__add">
            <button
              className="addMovie__btn"
              onClick={() => navigate("/admin/movie/add")}
            >
              Thêm phim
            </button>
          </div>
        </div>
      </div>
      <div className="movie__table">
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            size="small"
            style={{ color: "blue" }}
          />
        )}
      </div>
    </>
  );
};

export default ListMovie;
