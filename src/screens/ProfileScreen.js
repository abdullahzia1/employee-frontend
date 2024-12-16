import React from "react";
import { Table, Form, Row, Col, Container } from "react-bootstrap";

import Message from "../components/Message.js";
import Loader from "../components/Loader.js";

const ProfileScreen = () => {
  const isLoading = false;
  const error = {
    error: "No Error",
  };
  const submitHandler = () => {
    console.log("");
  };
  return (
    <>
      <Container>
        <Row>
          <Col md={3}>
            <h1
              style={{
                textAlign: "Start",
                fontSize: "45px",
                fontWeight: "600",
                color: "#000000",
                margin: "60px 0px",
              }}
            >
              User Profile
            </h1>

            <Form onSubmit={submitHandler}></Form>
          </Col>
          <Col md={9}>
            <h1
              style={{
                textAlign: "center",
                fontSize: "45px",
                fontWeight: "600",
                color: "#000000",
                margin: "60px 0px",
              }}
            >
              My Orders
            </h1>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.error}
              </Message>
            ) : (
              <Table striped hover responsive className="table-sm"></Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
