import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwtDecode(localStorage.getItem("authToken"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Use useNavigate here for navigation

  const loginUser = async (e) => {
    e.preventDefault();

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
        setAuthToken(data);
        const token = data.access_Token;
        setUser(jwtDecode(token.toString()));
        localStorage.setItem("authToken", JSON.stringify(data));
        navigate("/"); // Use navigate here instead of window.location.href
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login"); // Use navigate here for logout
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access_Token));
    }
    setLoading(false);
  }, [authTokens]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authTokens,
        loginUser,
        logoutUser,
        setUser,
        setAuthToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
