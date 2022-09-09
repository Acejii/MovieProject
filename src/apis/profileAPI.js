import axiosClient from "./axiosClient";

const profileAPI = {
  profileInfo: () => {
    return axiosClient.post("QuanLyNguoiDung/ThongTinTaiKhoan");
  },

  updateProfileInfo: (value) => {
    return axiosClient.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", value);
  },
};

export default profileAPI;
