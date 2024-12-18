import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [trackingId, setTrackingId] = useState(null);
  //
  const [authToken, setAuthToken] = useState(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        // Parse the token only if it's not already an object
        return token.startsWith('"') && token.endsWith('"')
          ? token
          : JSON.parse(token);
      } catch (err) {
        console.error("Error parsing token:", err);
        return null;
      }
    }
    return null;
  });

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authToken");
    return token && token.includes(".") ? jwtDecode(token) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Use useNavigate here for navigation

  const loginUser = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    localStorage.setItem("email", e.target.email.value);
    localStorage.setItem("password", e.target.password.value);

    try {
      const response = await fetch(`http://localhost:5000/api/employee/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        const token = data.token;

        if (token && token.split(".").length === 3) {
          setAuthToken(token);
          setUser(data.user);
          setTrackingId(data.tracking_id);
          localStorage.setItem("authToken", JSON.stringify(token));
          navigate("/homescreen");
        } else {
          toast.error("Invalid token format");
        }
        setIsLoading(false);
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        loginUser,
        logoutUser,
        setUser,
        setAuthToken,
        isLoading,
        trackingId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
