import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensure the container takes at least the full viewport height
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </div>
  );
};

export default Loader;
