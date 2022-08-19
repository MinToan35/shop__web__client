import React from "react";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const { authState } = useSelector((state) => state.auth);
  return authState.isAuthenticated ? children : <Navigate to="/dangnhap" />;
};

export default ProtectedRoute;
