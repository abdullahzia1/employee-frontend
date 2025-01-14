import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// This component will protect any route you want by checking if the user is logged in.
const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useContext(AuthContext);

  // If the user is authenticated, return the given element
  // If not, redirect them to the login page
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
