import React, { useState } from "react";
import { useSelector } from "react-redux";

import { GrFacebook } from "react-icons/gr";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import authAPI from "apis/authAPI";
import { notification } from "antd";

function Register() {
  const { user } = useSelector((state) => state.auth);
  const [isShowPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  notification.config({
    placement: "top",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
    },
    mode: "onTouched",
  });

  const { data: handleRegister, isLoading } = useRequest(
    (values) => authAPI.register(values),
    { isManual: true }
  );

  const onSubmit = async (values) => {
    try {
      await handleRegister(values);
      notification.success({
        message: "Đăng ký thành công",
      });
      navigate("/account/login");
    } catch (error) {
      notification.error({
        message: "Đăng ký thất bại",
        description: error,
      });
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-[70%] m-auto">
      <h1 className="text-center text-[20px] font-bold text-white mb-1 mt-3">
        ĐĂNG KÝ
      </h1>
      {/* main */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Họ tên */}
        <div
          className={`form-control mr-1 ${errors.hoTen ? "errorInput" : ""}`}
        >
          <input
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
        <div className={`form-control ${errors.taiKhoan ? "errorInput" : ""}`}>
          <input
            type="text"
            className="w-full pl-4 leading-[36px]"
            placeholder="Tên đăng nhập"
            spellCheck={false}
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
        <div className={`form-control ${errors.matKhau ? "errorInput" : ""}`}>
          <input
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
        <div className={`form-control ${errors.email ? "errorInput" : ""}`}>
          <input
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
        <div className={`form-control ${errors.soDt ? "errorInput" : ""}`}>
          <input
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

        {/*Loại người dùng  */}
        <div className="form-control">
          <input
            name="maNhom"
            id="maNhom"
            placeholder="Mã nhóm. VD: GP01, GP02..."
            className="text-black w-full pl-3 h-9 text-[14px]"
            {...register("maNhom", {
              required: "Không được để trống",
            })}
          ></input>
        </div>
        {errors.maNhom && (
          <p className="errorMessage">{errors.maNhom.message}</p>
        )}

        <div className="text-center">
          <button
            type="submit"
            className={`text-16 text-white font-bold px-[60px] py-3 bg-orange-500 mt-4 rounded-md hover:bg-orange-400 relative ${
              isLoading ? "customDisable" : ""
            }`}
          >
            ĐĂNG KÝ
            {isLoading && (
              <FaSpinner size={24} className="loading registerSpinner" />
            )}
          </button>
        </div>
      </form>
      {/* footer */}
      <div className="text-center mt-3">
        <h2 className="font-bold text-white mb-1">OR</h2>

        <button className="w-[90%] m-auto flex justify-center items-center py-3 bg-[#0675e8] rounded-xl hover:bg-blue-700">
          <GrFacebook size={20} className="mr-3" />
          <span className="text-center text-white">
            Đăng nhập bằng Facebook
          </span>
        </button>

        <div className="text-14 flex justify-center mt-3">
          <p>Bạn đã có tài khoản?</p>
          <button
            className="text-purple-600 font-semibold pl-2 mb-7 hover:text-purple-700"
            onClick={() => navigate("/account/login")}
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
