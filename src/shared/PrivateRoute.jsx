import { Navigate, Outlet } from "react-router-dom";
import tokenCookie from "../utils/tokenCookie";

const PrivateRoute = () => {
  const token = tokenCookie.get();
  return token ? <Outlet /> : <Navigate to="/main" />;
};

export default PrivateRoute;
