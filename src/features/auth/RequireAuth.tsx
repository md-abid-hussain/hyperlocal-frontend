import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentToken } from "./authSlice";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  const content = token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
