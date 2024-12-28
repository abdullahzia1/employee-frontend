import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Time = () => {
  let isData = false;

  const employeData = {
    checkIn: Date().split("GMT+0500 (Pakistan Standard Time)"),
    checkOut: Date().split("GMT+0500 (Pakistan Standard Time)"),
    break: 2,
    work: 9,
  };

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
              id="date"
              name="date"
              className="form-control"
              required
            />
          </div>
          <div className="col-sm-4 text-start">
            <button type="submit" className="btn btn-success">
              View
            </button>
          </div>
        </div>
      </form>

      <div>
        <div className="text-end fw-bold mb-2">Total Duration (Hours): 9</div>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Duration (Hours)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td>{employeData.checkIn}</td> */}
              <td>{employeData.checkIn}</td>
              <td>{employeData.checkOut}</td>
              <td>{employeData.work - employeData.break}h</td>
              {isData && (
                <td colSpan="5" className="text-center text-muted">
                  No Records Found
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Time;
