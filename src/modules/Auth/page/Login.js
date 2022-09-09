import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaSpinner } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { notification } from "antd";
import "./login.scss";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loginUser, setLoginUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isShowLoginPassword, setShowLoginPassword] = useState(false);

  notification.config({
    placement: "top",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleEnterToLogin = (e) => {
    // Enter để đăng nhập
    if (e.key !== "Enter") {
      return;
    }
    handleLogin(loginUser);
  };

  const handleLogin = async (loginUser) => {
    try {
      await dispatch(login(loginUser)).unwrap();
      // Chuyển về trang home
      navigate("/");
      notification.success({
        message: "Đăng nhập thành công",
      });
    } catch (error) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: error,
      });
    }
  };

  // Đã đăng nhập
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="border-1 px-5 py-5">
      {/* main */}
      <div className="w-[70%] m-auto">
        <h1 className="text-center text-[20px] font-bold text-white">
          ĐĂNG NHẬP
        </h1>
        {/* username */}
        <div className="form-control">
          <input
            type="text"
            name="taiKhoan"
            id="taiKhoan"
            className="w-full pl-10 leading-[36px] text-[16px] font-normal"
            placeholder="Tên đăng nhập"
            spellCheck={false}
            value={loginUser.username}
            onChange={handleChangeInput}
            onKeyDown={handleEnterToLogin}
          />
          <label htmlFor="username" className="user-form-icon">
            <FaUserAlt size={18} />
          </label>
        </div>

        {/* password */}
        <div className="form-control">
          <input
            type={isShowLoginPassword ? "text" : "password"}
            name="matKhau"
            id="matKhau"
            className="w-full pl-10 leading-[36px] text-[16px] font-normal"
            placeholder="Mật khẩu"
            spellCheck={false}
            value={loginUser.password}
            onChange={handleChangeInput}
            onKeyDown={handleEnterToLogin}
          />
          <label htmlFor="password" className="user-form-icon">
            <FaLock size={18} />
          </label>
          <div
            className="password-eye-icon cursor-pointer"
            onClick={() => setShowLoginPassword(!isShowLoginPassword)}
          >
            {isShowLoginPassword ? (
              <AiFillEyeInvisible size={18} />
            ) : (
              <AiFillEye size={18} />
            )}
          </div>
        </div>
        {/* Message  */}
        {error && (
          <div className="w-full m-auto mt-1 flex items-center text-red-600">
            <CgDanger />
            <p className="text-[14px] ml-1">{error}</p>
          </div>
        )}

        <div className="flex justify-between mt-3">
          <div className="flex items-center">
            <input type="checkbox" />
            <span className="text-[14] ml-2">Ghi nhớ tài khoản</span>
          </div>
          <div>
            <button className="text-[14] hover:opacity-80">
              Quên mật khẩu?
            </button>
          </div>
        </div>
        <div className="text-center">
          <button
            className={`text-[16] text-white font-bold px-[70px] py-3 bg-green-600 mt-4 rounded-md hover:bg-green-400 ${
              isLoading ? "customDisable" : ""
            }`}
            onClick={() => handleLogin(loginUser)}
          >
            ĐĂNG NHẬP
          </button>
        </div>
      </div>
      {/* footer */}
      <div className="text-center mt-3">
        <h2 className="font-bold text-white mb-3">OR</h2>

        <button className="w-[80%] m-auto flex justify-center items-center py-3 bg-[#0675e8] rounded-xl hover:bg-blue-800">
          <GrFacebook size={20} className="mr-3" />
          <span className="text-center text-white">
            Đăng nhập bằng Facebook
          </span>
        </button>

        <div className="text-[14] flex justify-center mt-3">
          <p>Bạn chưa có tài khoản?</p>
          <button
            className="text-purple-600 font-semibold pl-2 mb-5 hover:text-purple-700"
            onClick={() => navigate("/account/signup")}
          >
            Đăng ký ngay
          </button>
        </div>
        {/* Loading */}
        <div className="h-6 flex justify-center">
          {isLoading && <FaSpinner size={24} className="loading" />}
        </div>
      </div>
    </div>
  );
};

export default Login;
