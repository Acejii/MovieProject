import { useState } from "react";
import { useForm } from "react-hook-form";
import { notification } from "antd";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

import useRequest from "hooks/useRequest";
import userManagementAPI from "apis/userManagementAPI";

const EditUserContent = ({ userSelected: info, setOpen, onReload }) => {
  const [isShowPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hoTen: info?.hoTen,
      taiKhoan: info?.taiKhoan,
      matKhau: info?.matKhau,
      email: info?.email,
      soDt: info?.soDT,
      maNhom: "GP04",
      maLoaiNguoiDung: info?.maLoaiNguoiDung,
    },
    mode: "onTouched",
  });

  //config notification
  notification.config({
    placement: "top",
  });

  //   Gọi request cập nhật
  const { data: handleUpdate, isLoading } = useRequest(
    (values) => userManagementAPI.updateUser(values),
    { isManual: true }
  );

  // Submit
  const onSubmit = async (values) => {
    try {
      await handleUpdate(values);
      setOpen(false);
      onReload();
      notification.success({
        message: "Cập nhật thành công",
      });
    } catch (error) {
      notification.error({
        message: "Cập nhật thất bại",
        description: error,
      });
    }
  };

  return (
    <div className="profileEdit">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Họ tên */}
        <label htmlFor="hoTen" className="text-black font-bold text-[15px]">
          Họ tên
        </label>
        <div
          className={`form-control mr-1 ${errors.hoTen ? "errorInput" : ""}`}
        >
          <input
            id="hoTen"
            type="text"
            className="w-full pl-4 leading-[36px]"
            placeholder="Họ tên"
            spellCheck={false}
            {...register("hoTen", {
              required: "Không được để trống",
              minLength: { value: 2, message: "Tối thiểu 2 ký tự" },
              maxLength: { value: 8, message: "Tối đa 8 ký tự" },
            })}
          />
        </div>
        {errors.hoTen && <p className="errorMessage">{errors.hoTen.message}</p>}
        {/* Tài khoản */}
        <label htmlFor="taiKhoan" className="text-black font-bold text-[15px]">
          Tài khoản
        </label>
        <div className={`form-control ${errors.taiKhoan ? "errorInput" : ""}`}>
          <input
            id="taiKhoan"
            type="text"
            className="w-full pl-4 leading-[36px]"
            placeholder="Tên đăng nhập"
            spellCheck={false}
            disabled
            {...register("taiKhoan", {
              required: "Không được để trống",
              pattern: {
                value: /^[a-zA-Z0-9.\-_$@*!]{3,30}$/,
                message: "Tên đăng nhập không hợp lệ",
              },
            })}
          />
        </div>
        {errors.taiKhoan && (
          <p className="errorMessage">{errors.taiKhoan.message}</p>
        )}
        {/* password */}
        <label htmlFor="matKhau" className="text-black font-bold text-[15px]">
          Mật khẩu
        </label>
        <div className={`form-control ${errors.matKhau ? "errorInput" : ""}`}>
          <input
            id="matKhau"
            type={isShowPassword ? "text" : "password"}
            className="w-full pl-4 leading-[36px]"
            placeholder="Mật khẩu"
            spellCheck={false}
            {...register("matKhau", {
              required: "Không được để trống",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  "Mật khẩu phải dài ít nhất 8 ký tự, gồm tối thiểu 1 ký tự hoa, 1 ký tự thường và 1 ký tự số",
              },
            })}
          />
          <div
            className="password-eye-icon cursor-pointer"
            onClick={() => setShowPassword(!isShowPassword)}
          >
            {isShowPassword ? (
              <AiFillEyeInvisible size={18} />
            ) : (
              <AiFillEye size={18} />
            )}
          </div>
        </div>
        {errors.matKhau && (
          <p className="errorMessage">{errors.matKhau.message}</p>
        )}
        {/* email */}
        <label htmlFor="email" className="text-black font-bold text-[15px]">
          Email
        </label>
        <div className={`form-control ${errors.email ? "errorInput" : ""}`}>
          <input
            id="email"
            type="text"
            className="w-full pl-4 leading-[36px]"
            placeholder="Email"
            spellCheck={false}
            {...register("email", {
              required: "Không được để trống",
              pattern: {
                value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Email không hợp lệ",
              },
            })}
          />
        </div>
        {errors.email && <p className="errorMessage">{errors.email.message}</p>}
        {/* phone */}
        <label htmlFor="soDT" className="text-black font-bold text-[15px]">
          Số điện thoại
        </label>
        <div className={`form-control ${errors.soDt ? "errorInput" : ""}`}>
          <input
            id="soDT"
            type="text"
            className="w-full pl-4 leading-[36px]"
            placeholder="Số điện thoại"
            spellCheck={false}
            {...register("soDt", {
              required: "Không được để trống",
              pattern: {
                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: "Số điện thoại không hợp lệ",
              },
            })}
          />
        </div>
        {errors.soDt && <p className="errorMessage">{errors.soDt.message}</p>}

        {/* Type */}
        <label htmlFor="type" className="text-black font-bold text-[15px]">
          Người dùng
        </label>

        <div className="form-control">
          <select
            className="w-full pl-3 py-[10px]"
            id="type"
            {...register("maLoaiNguoiDung")}
          >
            <option value="KhachHang">Khách hàng</option>
            <option value="QuanTri">Quản trị</option>
          </select>
        </div>

        {/* footer */}
        <div className="text-center flex justify-between mt-5">
          <button
            type="submit"
            className={`text-16 text-white font-bold px-[60px] py-2 bg-orange-500 mt-4 rounded-md hover:bg-orange-400 relative ${
              isLoading ? "customDisable" : ""
            }`}
          >
            Cập nhật
            {isLoading && (
              <FaSpinner size={24} className="loading registerSpinner" />
            )}
          </button>
          <div
            className="text-16 text-white font-bold px-[60px] py-2 bg-gray-500 mt-4 rounded-md hover:bg-gray-400 hover:cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Huỷ
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUserContent;
