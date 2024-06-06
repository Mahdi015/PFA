import { Request, Response } from "express";
import axios from "axios";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const listUsers = async () =>
  await axios.get(`${process.env.API_URL}/users`, {});

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
