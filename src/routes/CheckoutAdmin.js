import Page404 from "modules/Page404";
import WarningPage from "modules/ResponsiveWarningPage/WarningPage";
import { useSelector } from "react-redux";

const CheckoutAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user && user.maLoaiNguoiDung !== "QuanTri") {
    return <Page404 />;
  }

  if (window.innerWidth < 1200) {
    return <WarningPage />;
  }

  return children;
};

export default CheckoutAdmin;
