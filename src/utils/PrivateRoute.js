import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { shouldRedirect } = useAuth();
  const token = localStorage.getItem("token");
  if (!token || shouldRedirect) {
    return <Navigate to="/admin/signin" />;
  }
  return children;
};

export default PrivateRoute;
