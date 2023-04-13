import { Outlet, Navigate, useLocation } from "react-router-dom";
import session from "../utils/session";

const SignupRouteGuard = ({ requiredKeys }) => {
  const location = useLocation();
  const user = session.get("user");

  const keysForCurrentPath = requiredKeys[location.pathname] ?? [];

  const hasAllRequiredKeys =
    user &&
    keysForCurrentPath.every((key) => {
      return user[key] !== null && user[key] !== undefined;
    });

  return hasAllRequiredKeys ? <Outlet /> : <Navigate to="/login" />;
};

export default SignupRouteGuard;
