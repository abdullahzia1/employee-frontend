import { useState } from "react";

// This is a simple fetch function wrapped for time tracking actions
const useTimeTracking = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const performTimeTrackingAction = async (
    action,
    tracking_id,
    employee_id
  ) => {
    setLoading(true);
    setError(null);

    const requestData = {
      action, // Action type (e.g., "start", "end", "break-start", "break-end")
      tracking_id,
      employee_id,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/employee/track-time`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.status === 200) {
        throw new Error("Error performing action");
      }

      const data = await response.json();
      console.log("Data from Hook", data);
      return data; // You can return the response from the backend here if needed
    } catch (error) {
      console.log("ERROR !!!!", error);
      setError(error.message);
      return null; // If you want to handle this in your component later
    } finally {
      setLoading(false);
    }
  };

  return { performTimeTrackingAction, error, loading };
};

export default useTimeTracking;