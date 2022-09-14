import axiosClient from "./axiosClient";

const movieAPI = {
  getMovies: () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP05",
      },
    });
  },

  getBanners: () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachBanner");
  },

  getMovieDetail: (movieId) => {
    return axiosClient.get("QuanLyPhim/LayThongTinPhim", {
      params: {
        maPhim: movieId,
      },
    });
  },

  getShowTimeDetail: (movieId) => {
    return axiosClient.get("QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        maPhim: movieId,
      },
    });
  },

  getCinemaSystem: () => {
    return axiosClient.get("QuanLyRap/LayThongTinHeThongRap");
  },

  getCinemaFromSystem: (cinemaSystem) => {
    return axiosClient.get("QuanLyRap/LayThongTinCumRapTheoHeThong", {
      params: {
        maHeThongRap: cinemaSystem,
      },
    });
  },

  getMovieShowTime: (movieId) => {
    return axiosClient.get("QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        maPhim: movieId,
      },
    });
  },

  getShowTimeFromCinemaSystem: (cinemaSystem) => {
    return axiosClient.get("QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maHeThongRap: cinemaSystem,
        maNhom: "GP04",
      },
    });
  },
};

export default movieAPI;
