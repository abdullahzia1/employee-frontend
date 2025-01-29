import React, { useState } from "react";
import { Container } from "react-bootstrap";
import DisplayAllUsers from "../components/DisplayAllUsers";
import EmployeePerformanceSheet from "../components/EmployeePerformanceSheet";
const AdminDisplay = () => {
  const [displayTimeSheet, setDisplayTimeSheet] = useState(true);
  const [displayAllUsers, setDisplayAllUsers] = useState(false);

  return (
    <Container>
      <div
        style={{ width: "50%" }}
        className="container d-flex mx-auto flex-row mt-4 bg-white rounded shadow-sm p-2"
      >
        <div className="d-flex flex-column align-items-center">
          <button
            onClick={() => {
              setDisplayAllUsers(false);
              setDisplayTimeSheet(true);
            }}
            className={`btn ${displayTimeSheet ? "text-primary" : ""}`}
          >
            Time Sheet
          </button>
          <span
            className="d-block w-100"
            style={{
              height: "2px",
              backgroundColor: displayTimeSheet ? "blue" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
        </div>
        <div className="d-flex flex-column align-items-center mx-4">
          <button
            onClick={() => {
              setDisplayAllUsers(true);
              setDisplayTimeSheet(false);
            }}
            className={`btn ${displayAllUsers ? "text-primary" : ""}`}
          >
            All Employees
          </button>
          <span
            className="d-block w-100"
            style={{
              height: "2px",
              backgroundColor: displayAllUsers ? "blue" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
        </div>
      </div>
      <div>{displayTimeSheet && <EmployeePerformanceSheet />}</div>
      {displayAllUsers && <DisplayAllUsers />}
    </Container>
  );
};

export default AdminDisplay;
