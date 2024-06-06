import './App.css';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import SignIn from './views/auth/SignIn';
import AdminDashboard from './views/admin/AdminDashboard';
import * as React from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin"  element={<AdminDashboard/>} />
        <Route path="/login"  element={<SignIn/>} />
      </Routes> 
    </Router>
  );
}

export default App;
