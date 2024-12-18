import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";

import LoginScreen from "./screens/LoginScreen.js";
import Header from "./components/Header.js";
import { AuthProvider } from "./context/AuthContext.js";
import HomeScreen from "./screens/HomeScreen.js";
import PrivateRoute from "./components/PrivateRoutes.js";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          {/* Protected Route */}
          <Route
            path="/homescreen"
            element={<PrivateRoute element={<HomeScreen />} />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
