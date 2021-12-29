import {Navigate, Outlet, useLocation} from "react-router-dom";

export function LoggedInMiddleware() {
  let accessToken = localStorage.getItem('accessToken');
  let location = useLocation();

  if (accessToken) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  return <Outlet />;
}
