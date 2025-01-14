import React, { useState } from "react";
import { Container } from "react-bootstrap";
import DisplayAllUsers from "../components/DisplayAllUsers";
import EmployeePerformanceSheet from "../components/EmployeePerformanceSheet";
const AdminDisplay = () => {
  const [displayTimeSheet, setDisplayTimeSheet] = useState(true);
  const [displayAllUsers, setDisplayAllUsers] = useState(false);

  const sampleData = [
    {
      tracking_id: 1,
      employee_id: "E001",
      date: "2025-01-01",
      total_work_time: "8.5",
      total_break_time: "1",
      start_time: "09:00",
      end_time: "17:30",
      break_start_time: "12:00",
      break_end_time: "13:00",
      updated_at: "2025-01-01 18:00",
      shift_status: "Completed",
      login_count: 1,
      total_idle_time: "0.5",
      idle_start_time: "16:00",
      break_status: "Taken",
    },
    {
      tracking_id: 2,
      employee_id: "E002",
      date: "2025-01-02",
      total_work_time: "7.5",
      total_break_time: "1.5",
      start_time: "09:00",
      end_time: "16:30",
      break_start_time: "12:30",
      break_end_time: "13:00",
      updated_at: "2025-01-02 17:00",
      shift_status: "Completed",
      login_count: 1,
      total_idle_time: "1",
      idle_start_time: "15:30",
      break_status: "Taken",
    },
  ];

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
      <div>
        {displayTimeSheet && <EmployeePerformanceSheet data={sampleData} />}
      </div>
      {displayAllUsers && <DisplayAllUsers />}
    </Container>
  );
};

export default AdminDisplay;
