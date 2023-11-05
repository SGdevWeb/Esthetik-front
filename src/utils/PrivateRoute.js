import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { shouldRedirect } = useAuth();
  const token = localStorage.getItem("token");
  if (!token || shouldRedirect) {
    return <Navigate to="/admin/signin" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
