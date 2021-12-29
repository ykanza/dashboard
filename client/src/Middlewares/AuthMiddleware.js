import {Navigate, Outlet, useLocation} from "react-router-dom";

export function AuthMiddleware() {
  let accessToken = localStorage.getItem('accessToken');
  let location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
