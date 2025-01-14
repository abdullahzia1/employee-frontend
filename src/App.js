import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";

import LoginScreen from "./screens/LoginScreen.js";
import Header from "./components/Header.js";
import { AuthProvider } from "./context/AuthContext.js";
import HomeScreen from "./screens/HomeScreen.js";
import PrivateRoute from "./components/PrivateRoutes.js";

import SingleAttendanceDisplay from "./screens/SingleAttendanceDisplay.js";
import LeavesDisplay from "./screens/LeavesDisplay.js";
import AdminDisplay from "./screens/AdminDisplay.js";
import EditEmployeeDetail from "./components/EditEmployeeDetail.js";

import TimeSheetDisplay from "./screens/TimeSheetDisplay.js";
import EmployeeStatus from "./screens/EmployeeStatus.js";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          {/* Protected Route */}
          <Route
            path="/homescreen"
            element={<PrivateRoute element={<HomeScreen />} />}
          />
          <Route
            path="/time"
            element={<PrivateRoute element={<SingleAttendanceDisplay />} />}
          />
          <Route
            path="/leave"
            element={<PrivateRoute element={<LeavesDisplay />} />}
          />
          <Route
            path="/admin"
            element={<PrivateRoute element={<AdminDisplay />} />}
          />
          <Route
            path="/performance"
            element={<PrivateRoute element={<TimeSheetDisplay />} />}
          />
          <Route
            path="/status"
            element={<PrivateRoute element={<EmployeeStatus />} />}
          />
          <Route
            path="/edit-user/:employeeId"
            element={<PrivateRoute element={<EditEmployeeDetail />} />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
