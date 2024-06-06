import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./views/auth/SignIn";
import AdminDashboard from "./views/admin/AdminDashboard";
import * as React from "react";
import AdminLayout from "./layout/AdminLayout";
import ListUsers from "./views/admin/ListUsers";
import { ProtectedRoute } from "./functions/admin";
import AddUserModal from "./components/AddUserModal";

function App() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Router>
      <AddUserModal showModal={showModal} setShowModal={setShowModal} />

      <Routes>
        <Route path="/" element={<AdminLayout setShowModal={setShowModal} />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list_users"
            element={
              <ProtectedRoute>
                <ListUsers />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
