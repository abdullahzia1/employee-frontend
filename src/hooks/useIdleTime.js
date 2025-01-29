import { useState } from "react";
import { AGENT_URL } from "../utility/helper";
import { apiService } from "../service/apiService";

// This is a simple fetch function wrapped for time tracking actions
const useIdleTime = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateIdleState = async (url, tracking_id) => {
    setLoading(true);
    setError(null);

    const requestData = {
      url, // Action type (e.g., "start", "end", "break-start", "break-end")
      tracking_id,
    };

    try {
      const data = await apiService.post(`${AGENT_URL}/${url}`, {
        requestData,
      });

      if (!data) {
        throw new Error("Error performing action");
      }
      return data;
    } catch (error) {
      console.log("ERROR !!!!", error);
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateIdleState, error, loading };
};

export default useIdleTime;
