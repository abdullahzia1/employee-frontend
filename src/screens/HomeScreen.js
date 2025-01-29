import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { format } from "date-fns";

import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import useTimeTracking from "../hooks/useTimeTracking";
import AuthContext from "../context/AuthContext.js";
import useIdleTime from "../hooks/useIdleTime.js";

const HomeScreen = () => {
  //state hooks
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showEndWorkModal, setShowEndWorkModal] = useState(false);

  // fetch data hooks
  const { performTimeTrackingAction } = useTimeTracking();

  const { updateIdleState } = useIdleTime();

  const {
    user,
    trackingId,
    shiftStatus,
    setShiftStatus,
    breakStatus,
    setBreakStatus,
    startingTime,
  } = useContext(AuthContext);
  const hour = new Date().getHours();
  const date = new Date(startingTime);
  const formattedDate = format(date, "HH:mm yyyy-MM-dd");
  const styledTime = `${formattedDate.slice(0, 5)} ${
    hour > 12 ? "PM" : "AM"
  }  ${formattedDate.slice(6)} `;

  const handleIdleAction = async (url) => {
    setIsLoading(true);
    await updateIdleState(url, trackingId);
    setIsLoading(false);
  };

  // handling start,end work. start break & end break
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
  // handling end work.
  const handleEndWork = () => {
    handleAction(
      "end",
      () => {
        // setIsBreakStarted(false); //to remove
        setBreakStatus(false); //
        setShiftStatus(true);
      },
      false
    );
    handleIdleAction("end-work");
  };

  const handleStartBreak = () => {
    handleAction("break-start", setBreakStatus, true);
    handleIdleAction("start-break"); // stops the idle tracking
  };

  const handleEndBreak = () => {
    handleAction("break-end", setBreakStatus, false);
    handleIdleAction("end-break"); // starts the idle tracking
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : shiftStatus ? (
        <Message variant="info">
          The shift is already completed. You cannot start work again at this
          time.
        </Message>
      ) : (
        <Container style={{ height: "100px", width: "100%", backgroundColor: " #dfd3a0" }}>
          <Row
            as={"h4"}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginTop: "70px",
            }}
          >
            <span
              style={{
                padding: "20px",
                width: "400px",
                justifyItems: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span> Start Time: {styledTime}</span>
            </span>
          </Row>

          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginTop: "70px",
            }}
          >
            {/* Work buttons */}
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
                disabled
                style={{ width: "150px", marginBottom: "15px" }}
              >
                Start Work
              </Button>
              <Button
                variant="danger"
                onClick={() => setShowEndWorkModal(true)}
                style={{ width: "150px" }}
              >
                End Work
              </Button>
            </Col>

            {/* Break buttons */}
            <Col
              xs="auto"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <>
                <Button
                  variant="warning"
                  onClick={handleStartBreak}
                  disabled={breakStatus}
                  style={{ width: "150px", marginBottom: "15px" }}
                >
                  Start Break
                </Button>
                <Button
                  variant="danger"
                  onClick={handleEndBreak}
                  disabled={!breakStatus}
                  style={{ width: "150px" }}
                >
                  End Break
                </Button>
              </>
            </Col>
          </Row>
        </Container>
      )}
      <Modal
        style={{ marginTop: "100px" }}
        show={showEndWorkModal}
        onHide={() => setShowEndWorkModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm End Work</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to end your work shift? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowEndWorkModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEndWork}>
            Yes, End Work
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomeScreen;
