import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import useTimeTracking from "../hooks/useTimeTracking";
import AuthContext from "../context/AuthContext.js";

const HomeScreen = () => {
  // Define state for managing button states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [hasWorkEnd, setHasWorkEnd] = useState(false);
  const [isBreakStarted, setIsBreakStarted] = useState(false);

  const [isWorkStarted, setIsWorkStarted] = useState(false);
  const [isWorkShiftActive, setIsWorkShiftActive] = useState(true);

  // Destructure the performTimeTrackingAction function from the custom hook
  const { performTimeTrackingAction } = useTimeTracking();
  const { user, trackingId, shiftStatus, setShiftStatus } =
    useContext(AuthContext);

  // Generic function for handling time tracking actions
  const handleAction = async (actionType, setStateFn, successState) => {
    setIsLoading(true);
    const result = await performTimeTrackingAction(
      actionType,
      trackingId,
      user.employee_id
    );
    setIsLoading(false);

    if (result) {
      setStateFn(successState);
    } else {
      setError(`Failed to ${actionType}`);
    }
  };

  // Handle start work action
  const handleStartWork = () => {
    handleAction(
      "start",
      (status) => {
        setIsWorkStarted(status);
        setIsBreakStarted(false);
      },
      true
    );
  };

  // Handle end work action
  const handleEndWork = () => {
    handleAction(
      "end",
      (status) => {
        setIsWorkStarted(false);
        setIsBreakStarted(false);
        setHasWorkEnd(status);
        setShiftStatus(true);
      },
      false
    );
  };

  // Handle start break action
  const handleStartBreak = () => {
    handleAction("break-start", (status) => setIsBreakStarted(status), true);
  };

  // Handle end break action
  const handleEndBreak = () => {
    handleAction("break-end", (status) => setIsBreakStarted(status), false);
  };

  // Use effect to check if the shift time has passed (e.g., end the break at 5 AM)
  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      if (currentHour === 5) {
        handleEndWork(); // Automatically end the break if it’s 5 AM
      }
    };

    checkTime();

    const interval = setInterval(checkTime, 60000); // 60,000 ms = 1 minute
    return () => clearInterval(interval);
  }, [isBreakStarted]);

  // Lock the button when shift is completed
  useEffect(() => {
    if (shiftStatus === true) {
      setIsWorkStarted(true); // Disable start work button
      setIsWorkShiftActive(false); // Disable shift options
    }
  }, [shiftStatus]);

  // If shift is completed, display message and disable further actions

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : shiftStatus ? (
        <>
          {" "}
          <Message variant="info">
            The shift is already completed. You cannot start work again.
          </Message>
          <div>.</div>
        </>
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
