import { Request, Response } from "express";
import axios from "axios";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const listUsers = async () =>
  await axios.get(`${process.env.REACT_APP_API_URL}/users`, {});

export const deleteUser = async (userId: string) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userId}`, {});
};

export const addUser = async (fullName: string) => {
  await axios.post(`${process.env.REACT_APP_API_URL}/users`, { fullName });
};

export const updateUser = async (userData: object) => {
  await axios.patch(`${process.env.REACT_APP_API_URL}/users`, userData);
};


//DoorHistory

export const listDoorHistorys = async () =>
  await axios.get(`${process.env.REACT_APP_API_URL}/door_history`, {});

export const deleteDoorHistory = async (doorHistoryId: string) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/door_history/${doorHistoryId}`, {});
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
