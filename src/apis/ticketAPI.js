import axiosClient from "./axiosClient";

const ticketAPI = {
  getTicketRoom: (showtimeId) => {
    return axiosClient.get("QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        MaLichChieu: showtimeId,
      },
    });
  },

  bookTicket: (values) => {
    return axiosClient.post("QuanLyDatVe/DatVe", values);
  },
};

export default ticketAPI;
