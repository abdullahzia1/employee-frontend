import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utility/helper";
import { fetchDepartments } from "../utility/apiUtils";
import { Button, Form } from "react-bootstrap";
import Loader from "./Loader";
import FormContainer from "./FormContainer";
import { toast } from "react-toastify";

const EditEmployeeDetail = () => {
  const { employeeId } = useParams();
  const [data, setData] = useState(null);

  // States for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hiringDate, setHiringDate] = useState("");
  const [selectedDepartmentOption, setSelectedDepartmentOption] = useState("");
  const [billing, setBilling] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [production, setProduction] = useState(false);
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [supervisor, setSupervisor] = useState("");

  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchEmployeeDetails = async () => {
    if (!employeeId) return null;
    try {
      const response = await fetch(
        `${BASE_URL}/admin/get-employee-detail/${employeeId}`
      );
      const data = await response.json();
      setData(data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      throw error;
    }
  };

  const fetchOptions = async () => {
    try {
      const data = await fetchDepartments();
      setOptions(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const employeeDetails = await fetchEmployeeDetails();
        if (employeeDetails) {
          await fetchOptions();
          setBilling(employeeDetails.billing);
          setScheduling(employeeDetails.scheduling);
          setProduction(employeeDetails.production);
          setIsSupervisor(employeeDetails.is_supervisor);
          setLeaveBalance(employeeDetails.leave_balance);
          setTotalLeaves(employeeDetails.total_leaves);
          setSupervisor(employeeDetails.supervisor);
        }
      } catch (error) {
        console.error("Error during data fetching:", error);
        toast.error("Failed to fetch required data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [employeeId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const requestData = {
        firstName: firstName || data?.first_name,
        lastName: lastName || data?.last_name,
        email: email || data?.email,
        hiringDate: hiringDate || data?.hire_date,
        departmentId: selectedDepartmentOption || data?.department_id,
        billing,
        scheduling,
        production,
        is_supervisor: isSupervisor,
        leave_balance: leaveBalance,
        total_leaves: totalLeaves,
        supervisor: supervisor || data?.supervisor,
        ...(password && { password }),
      };

      const response = await fetch(
        `${BASE_URL}/admin/update-user/${employeeId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) throw new Error("Failed to update user details");

      toast.success("Account Updated!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.message || "An error occurred while updating the user");
    } finally {
      setIsLoading(false);
    }
  };

  if (!employeeId) return <h1>No Employee was selected!</h1>;

  return (
    <FormContainer>
      <h1>Edit User</h1>
      <p>Editing user with ID: {employeeId}</p>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName || data?.first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={"" || lastName || data?.last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email || data?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="hiringDate">
          <Form.Label>Hiring Date</Form.Label>
          <Form.Control
            type="date"
            value={hiringDate || data?.hire_date?.slice(0, 10)}
            onChange={(e) => setHiringDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="billing">
          <Form.Check
            type="checkbox"
            label="Billing"
            checked={billing}
            onChange={(e) => setBilling(e.target.checked)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="scheduling">
          <Form.Check
            type="checkbox"
            label="Scheduling"
            checked={scheduling}
            onChange={(e) => setScheduling(e.target.checked)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="production">
          <Form.Check
            type="checkbox"
            label="Production"
            checked={production}
            onChange={(e) => setProduction(e.target.checked)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="isSupervisor">
          <Form.Check
            type="checkbox"
            label="Supervisor"
            checked={isSupervisor}
            onChange={(e) => setIsSupervisor(e.target.checked)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="leaveBalance">
          <Form.Label>Leave Balance</Form.Label>
          <Form.Control
            type="number"
            value={leaveBalance}
            onChange={(e) => setLeaveBalance(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="totalLeaves">
          <Form.Label>Total Leaves</Form.Label>
          <Form.Control
            type="number"
            value={totalLeaves}
            onChange={(e) => setTotalLeaves(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="supervisor">
          <Form.Label>Supervisor</Form.Label>
          <Form.Control
            type="text"
            value={supervisor || data?.supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            value={selectedDepartmentOption || data?.department_id}
            onChange={(e) => setSelectedDepartmentOption(e.target.value)}
          >
            <option>Select Department</option>
            {options.map((option) => (
              <option key={option.department_id} value={option.department_id}>
                {option.department_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button disabled={isLoading} type="submit" variant="primary">
          Update User
        </Button>
        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default EditEmployeeDetail;
