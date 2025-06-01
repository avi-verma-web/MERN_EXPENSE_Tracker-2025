import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children, requiresAuth = true }) => {
  const user = useSelector((state) => state.auth.user);
  if (requiresAuth) {
    // 👇 For protected routes
    return user ? children : <Navigate to="/login" replace />;
  } else {
    // 👇 For public routes like /login
    return user ? <Navigate to="/profile" replace /> : children;
  }
};

export default AuthRoute;
