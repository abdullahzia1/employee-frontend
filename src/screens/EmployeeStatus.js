import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { BASE_URL } from "../utility/helper";
import { FaCircle } from "react-icons/fa";

const EmployeeStatus = () => {
  const { user } = useContext(AuthContext);
  const [presentEmployees, setPresentEmployees] = useState([]);
  const [absentEmployees, setAbsentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      let user = { first_name: "Raza" };
      if (!user || !user.first_name) {
        setError("User data is not available.");
        setLoading(false);
        return;
      }

      const supervisor = user.first_name;

      try {
        const presentResponse = await fetch(
          `${BASE_URL}/admin/present-employees`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ supervisor }),
          }
        );
        const presentData = await presentResponse.json();
        const presentEmployees = presentData?.data?.[0]?.result || [];
        setPresentEmployees(presentEmployees);

        // Fetch absent employees
        const absentResponse = await fetch(
          `${BASE_URL}/admin/absent-employees`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ supervisor }),
          }
        );
        const absentData = await absentResponse.json();
        const absentEmployees = absentData?.data?.[0]?.result || [];
        setAbsentEmployees(absentEmployees);
      } catch (err) {
        setError("Failed to fetch employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Navigation Bar */}
      <nav
        style={{
          padding: "10px",
          width: "20%",
          backgroundColor: "#333",
          color: "white",
          borderRadius: "50px",
        }}
      >
        <h4 style={{ margin: "0 25px" }}>Employees Status</h4>
      </nav>

      <div style={{ padding: "20px" }}>
        {/* Present Employees */}
        <h3>Present Employees</h3>
        {presentEmployees.length > 0 ? (
          <ul>
            {presentEmployees.map((employee) => (
              <li style={{ listStyle: "none" }} key={employee.employee_id}>
                <FaCircle
                  style={{
                    color: "green",
                    fontSize: "16px",
                    marginRight: "10px",
                  }}
                />
                {employee.first_name} {employee.last_name} -{" "}
                {employee.online_status ? "Online" : "Offline"}
              </li>
            ))}
          </ul>
        ) : (
          <div>No employees are currently present.</div>
        )}

        {/* Absent Employees */}
        <h3>Absent Employees</h3>
        {absentEmployees.length > 0 ? (
          <ul>
            {absentEmployees.map((employee) => (
              <li key={employee.employee_id}>
                <FaCircle
                  style={{
                    color: "red",
                    fontSize: "16px",
                    marginRight: "10px",
                  }}
                />
                {employee.first_name} {employee.last_name} -{" "}
                {employee.online_status ? "Online" : "Offline"}
              </li>
            ))}
          </ul>
        ) : (
          <div>No employees are currently absent.</div>
        )}
      </div>
    </div>
  );
};

export default EmployeeStatus;
