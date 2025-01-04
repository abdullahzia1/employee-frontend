import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL } from "../utility/helper";
import AuthContext from "../context/AuthContext";

import convertISOTime from "../utility/timeConvert";

const SingleAttendanceDisplay = () => {
  const [attendanceDate, setAttendanceDate] = useState(null);
  const [apiCall, setApiCall] = useState(true);

  const [data, setData] = useState();

  const checkIn = convertISOTime(data?.checkIn);
  const checkOut = convertISOTime(data?.checkOut);

  const { authToken, user } = useContext(AuthContext);

  const fetchAttendanceRecord = async (e) => {
    e.preventDefault();
    try {
      let employeeId = user.employee_id;
      const response = await fetch(`${BASE_URL}/employee/get-attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify({ attendanceDate, employeeId }),
      });

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
      console.log("Re Render", data?.checkIn?.slice(11, 13));
    }
  }, [data]);
  return (
    <div
      className="container mt-4 p-4 bg-white rounded shadow-sm"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <div className="mb-4">
        <h2>My Attendance Records</h2>
      </div>
      <form className="mb-4">
        <div className="mb-3 row">
          <label htmlFor="date" className="col-sm-2 col-form-label">
            Date*
          </label>
          <div className="col-sm-6">
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
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Worked (Hours)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {data && (
                <>
                  {" "}
                  <td>{checkIn ? checkIn : "Nothing"}</td>
                  <td>{checkOut ? checkOut : "Nothing"}</td>
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
