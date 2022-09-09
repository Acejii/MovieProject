import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckoutRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/account/login" replace />;
  }
  return children;
};

export default CheckoutRoute;
