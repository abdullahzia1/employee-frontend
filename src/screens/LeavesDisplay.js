import React, { useState } from "react";
import ApplyLeaveForm from "../components/ApplyLeaveForm";
import MyLeaveList from "../components/MyLeaveList";

const LeavesDisplay = () => {
  const [applyLeave, setApplyLeave] = useState(true);
  const [myLeaves, setMyLeaves] = useState(false);

  return (
    <>
      <div
        style={{ width: "20%" }}
        className="container d-flex flex-row mt-4 bg-white rounded shadow-sm p-2"
      >
        <div className="d-flex flex-column align-items-center">
          <button
            onClick={() => {
              setMyLeaves(false);
              setApplyLeave(true);
            }}
            className={`btn ${applyLeave ? "text-primary" : ""}`}
          >
            Apply Leave
          </button>
          <span
            className="d-block w-100"
            style={{
              height: "2px",
              backgroundColor: applyLeave ? "blue" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
        </div>
        <div className="d-flex flex-column align-items-center mx-4">
          <button
            onClick={() => {
              setMyLeaves(true);
              setApplyLeave(false);
            }}
            className={`btn ${myLeaves ? "text-primary" : ""}`}
          >
            My Leave
          </button>
          <span
            className="d-block w-100"
            style={{
              height: "2px",
              backgroundColor: myLeaves ? "blue" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
        </div>
      </div>
      <div>{applyLeave && <ApplyLeaveForm />}</div>
      {myLeaves && <MyLeaveList />}
    </>
  );
};

export default LeavesDisplay;
