import React, { createContext, useState } from "react";
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [shiftStatus, setShiftStatus] = useState(() => {
    // Load shiftStatus from localStorage or default to false
    const savedShiftStatus = localStorage.getItem("shiftStatus");
    return savedShiftStatus ? JSON.parse(savedShiftStatus) : true;
  });
  const [breakStatus, setBreakStatus] = useState(() => {
    // Load shiftStatus from localStorage or default to false
    const savedBreakStatus = localStorage.getItem("breakStatus");
    return savedBreakStatus ? JSON.parse(savedBreakStatus) : false;
  });

  const [trackingId, setTrackingId] = useState(null);
  const [startingTime, setStartingTime] = useState(() => {
    // Load shiftStatus from localStorage or default to false
    const savedStartingTime = localStorage.getItem("startingTime");
    return savedStartingTime ? JSON.parse(savedStartingTime) : null;
  });
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
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
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
          console.log(data);
          setAuthToken(token);
          setUser(data.user);
          setTrackingId(data.tracking_id);
          setShiftStatus(data.shiftCompleted);
          setBreakStatus(data.breakStatus);
          setStartingTime(data.shiftStartTime);

          localStorage.setItem("authToken", JSON.stringify(token));
          localStorage.setItem(
            "shiftStatus",
            JSON.stringify(data.shiftCompleted)
          );
          localStorage.setItem("breakStatus", JSON.stringify(data.breakStatus));
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem(
            "startingTime",
            JSON.stringify(data.shiftStartTime)
          );
          // const electronResponse = await fetch(
          //   "http://localhost:4000/api/set-tracking-id",
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       trackingId: data.tracking_id,
          //       shiftStatus: data.shiftCompleted,
          //       tracking: true,
          //       breakStatus: data.breakStatus
          //       authToken: token
          //     }),
          //   }
          // );
          // const electronData = await electronResponse.json();
          // console.log("Tracking ID sent to electron:", electronData.data);

          navigate("/homescreen");
        } else {
          toast.error("Invalid token format");
        }
        setIsLoading(false);
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid Credentials");
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("shiftStatus");
    localStorage.removeItem("breakStatus");
    localStorage.removeItem("user");
    localStorage.removeItem("startingTime");
    localStorage.removeItem("authToken");
    setUser(null);
    setAuthToken(null);
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
        setShiftStatus,
        isLoading,
        trackingId,
        shiftStatus,
        breakStatus,
        setBreakStatus,
        startingTime,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
