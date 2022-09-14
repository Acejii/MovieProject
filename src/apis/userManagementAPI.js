import axiosClient from "./axiosClient";

const userManagementAPI = {
  getUsers: () => {
    return axiosClient.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        maNhom: "GP04",
      },
    });
  },

  SearchUser: (value) => {
    return axiosClient.get("QuanLyNguoiDung/TimKiemNguoiDung", {
      params: {
        tuKhoa: value ? value : null,
      },
    });
  },

  addUser: (user) => {
    return axiosClient.post("QuanLyNguoiDung/ThemNguoiDung", user);
  },

  updateUser: (user) => {
    return axiosClient.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
  },

  removeUser: (user) => {
    return axiosClient.delete("QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        taiKhoan: user,
      },
    });
  },
};

export default userManagementAPI;
