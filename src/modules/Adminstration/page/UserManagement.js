import React, { useState, useEffect, useReducer } from "react";

import { notification, Space, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { ImBin } from "react-icons/im";

import userManagementAPI from "apis/userManagementAPI";
import useRequest from "hooks/useRequest";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";
import "./usermanagement.scss";
import alert from "ultils/alert/alert";
import Spinner from "components/Spinner";

const UserManagement = () => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);
  const [x, forceUpdate] = useReducer((x) => x + 1, 0);
  const onReload = () => {
    forceUpdate();
  };

  // gọi api get users
  const { data: handleUsers, isLoading } = useRequest(
    (value) => userManagementAPI.SearchUser(value),
    {
      isManual: true,
    }
  );

  useEffect(() => {
    const fetchData = async (value) => {
      const data = await handleUsers(value);
      setUsers(data);
    };
    fetchData();
  }, [x]);

  // Handle Table
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Nhóm",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => handleEdit(record)}>
            <BiEdit size="18px" color="blue" />
          </button>
          <button onClick={() => handleRemove(record.taiKhoan)}>
            <ImBin size="18px" color="red" />
          </button>
        </Space>
      ),
    },
  ];

  const data = users?.map((user, index) => {
    return {
      key: index + 1,
      stt: index + 1,
      taiKhoan: user.taiKhoan,
      matKhau: user.matKhau,
      hoTen: user.hoTen,
      email: user.email,
      soDT: user.soDT,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
    };
  });

  const handleSearcChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const handleSearchUserByClick = async (value) => {
    const data = await handleUsers(value);
    setUsers(data);
  };

  const handleEnterToSearch = async (e) => {
    if (e.key !== "Enter") return;
    const data = await handleUsers(value);
    setUsers(data);
  };

  const handleEdit = (account) => {
    setUserSelected(account);
    setOpenModal(true);
  };

  const handleRemove = (account) => {
    alert(
      "Xoá người dùng",
      "Bạn có chắc chắn muốn xoá người dùng này",
      async () => {
        try {
          await userManagementAPI.removeUser(account);
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
      }
    );
  };

  return (
    <div className="user__manager">
      <div className="user__title">
        <h1>Quản lý tài khoản</h1>
        <div className="user__tool">
          <div className="user__search">
            <input
              value={value}
              type="text"
              placeholder="Tìm kiếm..."
              spellCheck={false}
              onChange={handleSearcChange}
              onKeyDown={handleEnterToSearch}
            />
            <div
              className="icon"
              onClick={() => handleSearchUserByClick(value)}
            >
              <BsSearch color="black" />
            </div>
          </div>

          <div className="user__add">
            <AddUserModal onReload={onReload} />
          </div>
        </div>
      </div>
      <div className="user__table">
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

      {isOpenModal && (
        <EditUserModal
          userSelected={userSelected}
          open={isOpenModal}
          setOpen={setOpenModal}
          onReload={onReload}
        />
      )}
    </div>
  );
};

export default UserManagement;
