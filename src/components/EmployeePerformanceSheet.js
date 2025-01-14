import React from "react";
import { Container, Table, Card } from "react-bootstrap";

const EmployeePerformanceSheet = ({ data }) => {
  // Calculate totals for all employees
  const calculateTotals = () => {
    return data.reduce(
      (totals, record) => {
        totals.totalWorkHours += parseFloat(record.total_work_time || 0);
        totals.totalBreakTime += parseFloat(record.total_break_time || 0);
        totals.totalIdleTime += parseFloat(record.total_idle_time || 0);
        totals.totalDays += 1;
        return totals;
      },
      {
        totalWorkHours: 0,
        totalBreakTime: 0,
        totalIdleTime: 0,
        totalDays: 0,
      }
    );
  };

  const { totalWorkHours, totalBreakTime, totalIdleTime, totalDays } =
    calculateTotals();

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Employee Performance Sheet</h2>

      {/* Summary Card */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Summary</Card.Title>
          <Card.Text>
            <strong>Total Days: </strong> {totalDays} <br />
            <strong>Total Work Hours: </strong> {totalWorkHours.toFixed(2)}{" "}
            hours <br />
            <strong>Total Break Time: </strong> {totalBreakTime.toFixed(2)}{" "}
            hours <br />
            <strong>Total Idle Time: </strong> {totalIdleTime.toFixed(2)} hours
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Detailed Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Total Work Time</th>
            <th>Total Break Time</th>
            <th>Total Idle Time</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((record) => (
              <tr key={record.tracking_id}>
                <td>{record.tracking_id}</td>
                <td>{record.employee_id}</td>
                <td>{record.date}</td>
                <td>{record.total_work_time}</td>
                <td>{record.total_break_time}</td>
                <td>{record.total_idle_time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeePerformanceSheet;
