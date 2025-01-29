import { useState } from "react";
import { apiService } from "../service/apiService";
import { BASE_URL } from "../utility/helper";

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
      const data = await apiService.post(
        `${BASE_URL}/employee/track-time`,
        requestData
      );

      if (!data) {
        throw new Error("Error performing action");
      }
      return data;
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
