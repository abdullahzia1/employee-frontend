import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

import { BASE_URL } from "../utility/helper";
import { useNavigate } from "react-router-dom";

const ApplyLeaveForm = () => {
  const [displayLeaveBalance, setDisplayLeaveBalance] = useState(false);
  const [myLeaveBalance, setMyLeaveBalance] = useState(null);
  const [leaveType, setLeaveType] = useState("");
  const [leaveInterval, setLeaveInterval] = useState(0);
  const [comments, setComments] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [totalLeaves, setTotalLeaves] = useState(null);
  const { user, authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const isTrue =
    leaveType && leaveInterval && toDate && fromDate && comments ? true : false;

  const fetchLeaveBalance = async () => {
    try {
      let employeeId = user.employee_id;
      const response = await fetch(`${BASE_URL}/employee/leave-balance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify({ employeeId }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Data from Hook", data);
        setMyLeaveBalance(+data.leaveBalance);
        setTotalLeaves(+data.totalLeaves);
      }
    } catch (error) {
      console.log("ERROR !!!!", error);
    }
  };

  useEffect(() => {
    fetchLeaveBalance();
  }, []);

  // post leaves
  const postLeaves = async (e) => {
    e.preventDefault();
    try {
      let employeeId = user.employee_id;
      const response = await fetch(`${BASE_URL}/employee/leave-apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify({
          employeeId,
          myLeaveBalance,
          leaveType,
          leaveInterval,
          comments,
          fromDate,
          toDate,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Leave Applied", data);
        setMyLeaveBalance(+data.leaveBalance);
        navigate("/leave");
      }
    } catch (error) {
      console.log("ERROR !!!!", error);
    }
  };

  return (
    <div className="container mt-5 p-4 bg-white rounded shadow-sm w-75">
      <h5 className="mb-4">
        Total Leaves: {totalLeaves <= 0 || null ? 0 : totalLeaves}
      </h5>
      <h5 className="mb-4">Apply Leave</h5>
      {myLeaveBalance >= 1 && (
        <form>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="leaveType" className="form-label">
                Leave Type<span className="text-danger">*</span>
              </label>
              <select
                required
                id="leaveType"
                className="form-select"
                onChange={(e) => {
                  setLeaveType(e.target.value);
                  setDisplayLeaveBalance(true);
                }}
              >
                <option>-- Select --</option>
                <option value="annual">Annual Leave</option>
                <option value="sick">Sick Leave</option>
              </select>
              {displayLeaveBalance && (
                <>
                  <label htmlFor="leaveType" className="form-label mt-2">
                    Select Leave Interval<span className="text-danger">*</span>
                  </label>
                  <select
                    onChange={(e) => setLeaveInterval(+e.target.value)}
                    required
                    className="form-select"
                  >
                    <option>-- Select --</option>
                    <option value="0.5">Half Day Leave</option>
                    <option value="1">Full Day Leave</option>
                  </select>
                </>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label">Leave Balance</label>
              <p className="mt-2">{myLeaveBalance} Day(s)</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="fromDate" className="form-label">
                From Date<span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type="date"
                  onChange={(e) => setFromDate(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="toDate" className="form-label">
                To Date<span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type="date"
                  onChange={(e) => setToDate(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="comments" className="form-label">
              Comments
            </label>
            <textarea
              required
              onChange={(e) => setComments(e.target.value)}
              className="form-control"
              rows="3"
            ></textarea>
          </div>

          <div className="text-muted mb-3">
            <span className="text-danger">*</span> Required
          </div>

          <div className="text-end">
            <button
              onClick={postLeaves}
              disabled={!isTrue}
              type="submit"
              className="btn btn-success"
            >
              Apply
            </button>
          </div>
        </form>
      )}
      {myLeaveBalance <= 0 && (
        <div>You Leave Quota is Zero, Contact your HR department.</div>
      )}
    </div>
  );
};

export default ApplyLeaveForm;
