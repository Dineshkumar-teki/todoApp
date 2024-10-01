import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = Cookies.get("jwtToken");
  return auth ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
