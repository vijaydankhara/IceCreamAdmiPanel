import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken");

  return isAuthenticated ? children : <Navigate to="/Register_Login"  />;
};

export default ProtectedRoute;
