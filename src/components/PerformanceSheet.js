import React, { useState, useEffect } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { BASE_URL } from "../utility/helper";
import { fetchEmployees } from "../utility/apiUtils";

const PerformanceSheet = () => {
  const [performanceSheet, setPerformanceSheet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees on mount
    const fetchOptions = async () => {
      try {
        const data = await fetchEmployees();
        setAllEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchOptions();
  }, []);

  const fetchPerformanceData = async (url, params) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      if (data.success) {
        setPerformanceSheet(data.performanceSheet);
        console.log(data.performanceSheet);
      } else {
        alert("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching performance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSingleEmployeeSearch = () => {
    if (!employeeId || !fromDate || !toDate) {
      alert("Please provide Employee ID and both dates");
      return;
    }
    const url = "admin/single-timesheet";
    const params = { employeeId, fromDate, toDate };
    fetchPerformanceData(url, params);
  };

  const handleAllEmployeesSearch = () => {
    if (!fromDate || !toDate) {
      alert("Please provide both dates");
      return;
    }
    const url = "admin/full-timesheet";
    const params = { fromDate, toDate };
    fetchPerformanceData(url, params);
  };

  const formatTime = (time) => {
    if (!time || Object.keys(time).length === 0) return "N/A";
    const { hours = 0, minutes = 0 } = time;
    return `${hours}h ${minutes}m`;
  };

  return (
    <Container className="mt-4">
      <h2>Employee Performance & Leave Sheet</h2>

      {/* Filters Section */}
      <Form className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Employee</Form.Label>
              <Form.Control
                as="select"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              >
                <option value="">Select an Employee</option>
                {allEmployees.map((employee) => (
                  <option
                    key={employee.employee_id}
                    value={employee.employee_id}
                  >
                    {employee.first_name} (ID: {employee.employee_id})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Form.Label>Employee(s) Performance</Form.Label>
          <Col md={3} className="d-flex align-items-end">
            <Button className="me-2" onClick={handleSingleEmployeeSearch}>
              Single
            </Button>
            <Button onClick={handleAllEmployeesSearch}>All</Button>
          </Col>
        </Row>
      </Form>

      {/* Data Display Section */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        performanceSheet.map((employee) => (
          <Row key={employee.employee_id} className="mb-4">
            <Col>
              <Card>
                <Card.Header>Employee ID: {employee.employee_id}</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Work Time</th>
                        <th>Idle Time</th>
                        <th>Break Time</th>
                        <th>Leave Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employee?.performanceData?.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No Data Available
                          </td>
                        </tr>
                      ) : (
                        employee?.performanceData?.map((data, i) => (
                          <tr key={i}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{formatTime(data.total_work_time)}</td>
                            <td>{formatTime(data.total_idle_time)}</td>
                            <td>{formatTime(data.total_break_time)}</td>
                            <td>
                              {data.leave ? `${data.leave} day(s)` : "N/A"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))
      )}
    </Container>
  );
};

export default PerformanceSheet;
