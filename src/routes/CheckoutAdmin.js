import Page404 from "modules/Page404";
import { useSelector } from "react-redux";

const CheckoutAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user && user.maLoaiNguoiDung === "QuanTri") {
    return children;
  }

  return <Page404 />;
};

export default CheckoutAdmin;
