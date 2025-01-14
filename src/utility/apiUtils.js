// apiUtils.js
export const fetchDepartments = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/admin/departments");
    const data = await response.json();
    if (response.status === 200) {
      return data.departments; // Return the fetched data
    } else {
      throw new Error("Failed to fetch options");
    }
  } catch (err) {
    console.error(err.message);
    throw new Error("Failed to load options");
  }
};

export const fetchEmployees = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/admin/employees");
    const data = await response.json();
    if (response.status === 200) {
      return data.users; // Return the fetched data
    } else {
      throw new Error("Failed to fetch options");
    }
  } catch (err) {
    console.error(err.message);
    throw new Error("Failed to load options");
  }
};
