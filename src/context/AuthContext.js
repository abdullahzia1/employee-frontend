import { jwtDecode } from "jwt-decode";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AGENT_URL, BASE_URL } from "../utility/helper";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [shiftStatus, setShiftStatus] = useState(() => {
    const savedShiftStatus = localStorage.getItem("shiftStatus");
    return savedShiftStatus ? JSON.parse(savedShiftStatus) : true;
  });

  const [breakStatus, setBreakStatus] = useState(() => {
    const savedBreakStatus = localStorage.getItem("breakStatus");
    return savedBreakStatus ? JSON.parse(savedBreakStatus) : false;
  });

  const [trackingId, setTrackingId] = useState(null);
  const [startingTime, setStartingTime] = useState(() => {
    const savedStartingTime = localStorage.getItem("startingTime");
    return savedStartingTime ? JSON.parse(savedStartingTime) : null;
  });

  const [authToken, setAuthToken] = useState(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
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
    const token = localStorage.getItem("dataToken");
    if (token) {
      try {
        return jwtDecode(token);
      } catch (err) {
        console.error("Error decoding data token:", err);
        return null;
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    localStorage.setItem("email", e.target.email.value);
    localStorage.setItem("password", e.target.password.value);

    try {
      const data = await axios.post(`${BASE_URL}/employee/login`, {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      if (data.status === 200) {
        const {
          token,
          dataToken,
          tracking_id,
          shiftCompleted,
          breakStatus,
          shiftStartTime,
        } = data.data;
        console.log(data);
        if (token && token.split(".").length === 3) {
          setAuthToken(token);
          const decoded = jwtDecode(dataToken);
          setUser(decoded);
          setTrackingId(tracking_id);
          setShiftStatus(shiftCompleted);
          setBreakStatus(breakStatus);
          setStartingTime(shiftStartTime);

          // Store data in localStorage
          localStorage.setItem("authToken", JSON.stringify(token));
          localStorage.setItem("dataToken", JSON.stringify(dataToken));
          localStorage.setItem("shiftStatus", JSON.stringify(shiftCompleted));
          localStorage.setItem("breakStatus", JSON.stringify(breakStatus));
          localStorage.setItem("user", JSON.stringify(decoded));
          localStorage.setItem("startingTime", JSON.stringify(shiftStartTime));

          // Send tracking data to electron
          // await axios.post(`${AGENT_URL}/set-tracking-id`, {
          //   trackingId: tracking_id,
          //   shiftStatus: shiftCompleted,
          //   tracking: true,
          //   breakStatus,
          //   authToken: token,
          // });

          navigate("/homescreen");
        } else {
          toast.error("Invalid token format");
        }
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("shiftStatus");
    localStorage.removeItem("breakStatus");
    localStorage.removeItem("user");
    localStorage.removeItem("startingTime");
    localStorage.removeItem("authToken");
    localStorage.removeItem("dataToken");
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
