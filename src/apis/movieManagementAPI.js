import axiosClient from "./axiosClient";

const movieManagementAPI = {
  getMovies: (value) => {
    return axiosClient.get("QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP04",
        tenPhim: value || null,
      },
    });
  },

  removeMovie: (movieId) => {
    return axiosClient.delete("QuanLyPhim/XoaPhim", {
      params: {
        maPhim: movieId,
      },
    });
  },

  addMovie: (value) => {
    return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", value);
  },

  updateMovie: (value) => {
    return axiosClient.post("QuanLyPhim/CapNhatPhimUpload", value);
  },

  movieShowtime: (value) => {
    return axiosClient.post("QuanLyDatVe/TaoLichChieu", value);
  },
};

export default movieManagementAPI;
