import React from "react";
import { Container } from "react-bootstrap";

import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

const HomeScreen = () => {
  const isLoading = false;
  const error = {
    error: "No Error",
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Container>
            <h1
              style={{
                textAlign: "center",
                fontSize: "45px",
                fontWeight: "600",
                color: "#000000",
                margin: "60px 0px",
              }}
            >
              New Arrivals
            </h1>
            {/* <Row>
              {data.products.slice(0, 4).map((product) => (
                <Col
                className="newArrivalResponsive"
                  key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Product product={product} />
                </Col>
              ))}
            </Row> */}

            <hr className="hr hr-blurry" />
            <h1
              style={{
                textAlign: "center",
                fontSize: "45px",
                fontWeight: "600",
                color: "#000000",
                margin: "60px 0px",
              }}
            >
              OUR
            </h1>
          </Container>
        </>
      )}
    </>
  );
};

export default HomeScreen;
