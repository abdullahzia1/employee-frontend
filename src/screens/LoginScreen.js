import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import Loader from "../components/Loader.js";
import FormContainer from "../components/FormContainer.js";
import AuthContext from "../context/AuthContext.js";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isLoading = false;

  const { user, loginUser } = useContext(AuthContext);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
      navigate("/homescreen");
    }
  }, [user]);

  return (
    <FormContainer>
      <h1
        style={{
          textAlign: "Start",
          fontSize: "45px",
          fontWeight: "600",
          color: "#000000",
          margin: "60px 0px",
        }}
      >
        Sigin In
      </h1>

      <Form onSubmit={loginUser}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label
            style={{
              textAlign: "start",
              fontSize: "20px",
              fontWeight: "600",
              color: "#000000",
            }}
          >
            Email Address
          </Form.Label>
          <Form.Control
            style={{
              border: "1px solid rgba(0, 0, 0, 0.35)",
              borderRadius: "20px",
            }}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label
            style={{
              textAlign: "start",
              fontSize: "20px",
              fontWeight: "600",
              color: "#000000",
            }}
          >
            Password
          </Form.Label>
          <Form.Control
            style={{
              border: "1px solid rgba(0, 0, 0, 0.35)",
              borderRadius: "20px",
            }}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type="submit"
          style={{
            fontSize: "20px",
            fontWeight: "300",
            color: "#ffff",
            textAlign: "center",
            border: "1px Solid black",
            background: "black",
            borderRadius: "200px",
            margin: "20px 0px",
            padding: "10px 25px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          Sign In
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
