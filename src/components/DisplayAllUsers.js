import React, { useContext, useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import { BASE_URL } from "../utility/helper";
import { useNavigate } from "react-router-dom";

const DisplayAllUsers = () => {
  const [users, setUsers] = useState([]);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch user data from your API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/employees`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            AuthToken: authToken,
          },
        }); // Adjust API endpoint accordingly
        const data = await response.json();
        setUsers(data.users);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (employeeId) => {
    navigate(`/edit-user/${employeeId}`);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">User List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.employee_id}>
                <td>{user.employee_id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(user.employee_id)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default DisplayAllUsers;
