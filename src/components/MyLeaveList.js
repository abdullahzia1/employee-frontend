import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utility/helper";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MyLeaveList = () => {
  const { authToken, user } = useContext(AuthContext);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [data, setData] = useState([]);

  const isTrue = toDate && fromDate ? true : false;
  const fetchLeaves = async () => {
    try {
      let employeeId = user.employee_id;
      const response = await fetch(`${BASE_URL}/employee/leave-check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify({ fromDate, employeeId, toDate }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Data from Hook", data);
        setData(data.totalLeaves);
        console.log(data);
      }
    } catch (error) {
      console.log("ERROR !!!!", error);
    }
  };
  const handleFetchLeaves = (e) => {
    e.preventDefault();
    const fromDateCompare = new Date(fromDate);
    const toDateCompare = new Date(toDate);

    if (fromDateCompare <= toDateCompare) {
      fetchLeaves();
      return;
    }
    toast.error("Please Enter Valid Dates!");
    return;
  };

  useEffect(() => {
    if (data) {
      console.log("Re Render");
    }
  }, [data]);

  return (
    <div
      className="container mt-4 p-4 bg-white rounded shadow-sm"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-primary">My Leave List</h5>
        </div>
        <hr />
        <form className="mb-4">
          <div className="row g-3">
            {/* From Date */}
            <div className="col-md-3">
              <label htmlFor="fromDate" className="form-label">
                From Date
              </label>
              <div className="input-group">
                <input
                  type="date"
                  onChange={(e) => {
                    setFromDate(e.target.value);
                    console.log(e.target.value);
                    console.log(e.target.value.slice(8, 10));
                  }}
                  onSelect={(e) => {}}
                  className="form-control"
                  placeholder="D, dd M yyyy"
                />
              </div>
            </div>
            {/* To Date */}
            <div className="col-md-3">
              <label htmlFor="toDate" className="form-label">
                To Date
              </label>
              <div className="input-group">
                <input
                  type="date"
                  onChange={(e) => {
                    setToDate(e.target.value);
                  }}
                  className="form-control"
                  placeholder="D, dd M yyyy"
                />
              </div>
            </div>
            {/* Show Leave with Status */}
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <p className="text-muted mb-0">* Required</p>
          </div>
          <div className="text-end">
            <button
              onClick={handleFetchLeaves}
              disabled={!isTrue}
              type="submit"
              className="btn btn-success"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
      {data.length === 0 && <h1>No Record.</h1>}
      {data.length > 0 && (
        <div className="container">
          <h1>Employee Leave Records</h1>
          <table className="table table-bordered mt-4">
            <thead className="thead-light">
              <tr>
                <th>Leave ID</th>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Employee ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((leave) => (
                <tr key={leave.leave_id}>
                  <td>{leave.leave_id}</td>
                  <td>{leave.leave_type}</td>
                  <td>{new Date(leave.from_date).toLocaleDateString()}</td>
                  <td>{new Date(leave.to_date).toLocaleDateString()}</td>
                  <td>{leave.employee_id}</td>
                  <td>{leave.status === null ? "Pending" : "Approved"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyLeaveList;
