import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL } from "../utility/helper";
import AuthContext from "../context/AuthContext";

import { convertToPakTime } from "../utility/timeConvert";
import { apiService } from "../service/apiService";

const SingleAttendanceDisplay = () => {
  const [attendanceDate, setAttendanceDate] = useState(null);
  const [apiCall, setApiCall] = useState(true);

  const [data, setData] = useState();
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const { user } = useContext(AuthContext);

  const fetchAttendanceRecord = async (e) => {
    e.preventDefault();
    try {
      let employeeId = user.employee_id;

      const response = await apiService.post(
        `${BASE_URL}/employee/get-attendance`,
        { attendanceDate, employeeId }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("Data from Hook", data);
        setData(data);
      }
      if (response.status === 204) {
        const data = await response.json();
        console.log("Data from Hook", data);
        setData(null);
      }
    } catch (error) {
      console.log("ERROR !!!!", error);
    }
  };

  useEffect(() => {
    if (data) {
      setCheckInTime(convertToPakTime(data?.checkIn));
      setCheckOutTime(convertToPakTime(data?.checkOut));
    }
  }, [data]);
  return (
    <div
      className="container mt-4 p-4 rounded shadow-sm"
      style={{ backgroundImage: " #dfd3a0" }}
    >
      <div className="mb-4">
        <h2>My Attendance Records</h2>
      </div>
      <form className="mb-4">
        <div className="mb-3 row ">
          <label
            htmlFor="date"
            className="col-sm-1 fw-bold col-form-label "
            style={{ marginLeft: "40px" }}
          >
            Date*
          </label>
          <div className="col-sm-2">
            <input
              type="date"
              onChange={(e) => {
                setAttendanceDate(e.target.value);
              }}
              onInput={() => {
                setApiCall(false);
              }}
              name="date"
              className="form-control"
              required
            />
          </div>
          <div className="col-sm-4 text-start">
            <button
              type="submit"
              className="btn btn-success"
              onClick={fetchAttendanceRecord}
              disabled={apiCall}
            >
              View
            </button>
          </div>
        </div>
      </form>
      {data === null && <p>No Data</p>}
      <div>
        <div className="text-end fw-bold mb-2">Shift Duration (Hours): 9</div>
        <table
          className="table table-bordered"
          style={{ background: " #dfd3a0" }}
        >
          <thead className="table" style={{ backgroundColor: " #dfd3a0" }}>
            <tr style={{ backgroundColor: " #dfd3a0" }}>
              <th
                style={{
                  backgroundColor: "#70706f",
                }}
              >
                Check In
              </th>
              <th style={{ backgroundColor: "#70706f" }}>Check Out</th>
              <th style={{ backgroundColor: "#70706f" }}>Worked (Hours)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {data && (
                <>
                  {" "}
                  <td>{checkInTime ? checkInTime.toUpperCase() : "Nothing"}</td>
                  <td>
                    {checkOutTime ? checkOutTime.toUpperCase() : "Nothing"}
                  </td>
                  <td>
                    {`${data?.totalWorkTime?.slice(
                      0,
                      2
                    )}h : ${data?.totalWorkTime?.slice(3, 5)}m`}
                  </td>{" "}
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleAttendanceDisplay;
