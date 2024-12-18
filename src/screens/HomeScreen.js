import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import useTimeTracking from "../hooks/useTimeTracking"; // Import the custom hook
import AuthContext from "../context/AuthContext.js";

const HomeScreen = () => {
  // Define state for managing button states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasWorkEnd, setHasWorkEnd] = useState(false);
  const [isWorkStarted, setIsWorkStarted] = useState(false);
  const [isBreakStarted, setIsBreakStarted] = useState(false);
  const [isWorkShiftActive, setIsWorkShiftActive] = useState(true);

  // Destructure the performTimeTrackingAction function from the custom hook
  const { performTimeTrackingAction } = useTimeTracking();
  const { user, trackingId } = useContext(AuthContext);

  // Handle start work action
  const handleStartWork = async () => {
    setIsLoading(true);
    const result = await performTimeTrackingAction(
      "start",
      trackingId,
      user.employee_id
    );
    if (result) {
      setIsWorkStarted(true);
      setIsBreakStarted(false);
    } else {
      setError("Failed to start work");
    }
    setIsLoading(false);
  };

  // Handle end work action
  const handleEndWork = async () => {
    setIsLoading(true);
    const result = await performTimeTrackingAction(
      "end",
      trackingId,
      user.employee_id
    );
    if (result) {
      setIsWorkStarted(false);
      setIsBreakStarted(false);
      setHasWorkEnd(true); // You can set a condition when work ends
    } else {
      setError("Failed to end work");
    }
    setIsLoading(false);
  };

  // Handle start break action
  const handleStartBreak = async () => {
    setIsLoading(true);
    const result = await performTimeTrackingAction(
      "break-start",
      trackingId,
      user.employee_id
    );
    if (result) {
      setIsBreakStarted(true);
    } else {
      setError("Failed to start break");
    }
    setIsLoading(false);
  };

  // Handle end break action
  const handleEndBreak = async () => {
    setIsLoading(true);
    const result = await performTimeTrackingAction(
      "break-end",
      trackingId,
      user.employee_id
    );
    if (result) {
      setIsBreakStarted(false);
    } else {
      setError("Failed to end break");
    }
    setIsLoading(false);
  };

  // Handle time shift logic (you can change the hours if needed)
  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      if (currentHour >= 5 && currentHour < 17) {
        setIsWorkShiftActive(false);
      } else {
        setIsWorkShiftActive(true);
      }
    };

    checkTime();

    const interval = setInterval(checkTime, 60000); // 60,000 ms = 1 minute
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {!hasWorkEnd && (
            <Container>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "30px",
                  marginTop: "150px",
                }}
              >
                {/* First row - Work buttons */}
                <Col
                  xs="auto"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="primary"
                    onClick={handleStartWork}
                    disabled={isWorkStarted || !isWorkShiftActive}
                    style={{ width: "150px", marginBottom: "15px" }}
                  >
                    Start Work
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleEndWork}
                    disabled={!isWorkStarted}
                    style={{ width: "150px" }}
                  >
                    End Work
                  </Button>
                </Col>

                {/* Second row - Break buttons */}
                <Col
                  xs="auto"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {isWorkStarted && (
                    <>
                      <Button
                        variant="warning"
                        onClick={handleStartBreak}
                        disabled={isBreakStarted}
                        style={{ width: "150px", marginBottom: "15px" }}
                      >
                        Start Break
                      </Button>

                      <Button
                        variant="danger"
                        onClick={handleEndBreak}
                        disabled={!isBreakStarted}
                        style={{ width: "150px" }}
                      >
                        End Break
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
