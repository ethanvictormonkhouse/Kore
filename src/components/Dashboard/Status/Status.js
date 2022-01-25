import React, { useState } from "react";
import {
  Card,
  Container,
  Col,
  Row,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Status() {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Available", value: "1" },
    { name: "Busy", value: "2" },
    { name: "In A Call", value: "3" },
    { name: "On A Break", value: "4" },
    { name: "Away", value: "5" },
  ];

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Your Status</h2>
          <p className="text-center mb-2">
            You've been working on <strong>'Front-End'</strong> for{" "}
            <strong>87 minutes</strong>. Maybe take a break?{" "}
          </p>
        </Card.Body>
        <Container className="d-flex justify-content-center mb-3">
          <ButtonGroup>
            <ToggleButton
              id="available"
              type="radio"
              variant="outline-success"
              name="available"
              value="1"
              checked={radioValue === "1"}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-check" /> Available
            </ToggleButton>
            <ToggleButton
              id="busy"
              type="radio"
              variant="outline-danger"
              name="available"
              value="2"
              checked={radioValue === "2"}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              <FontAwesomeIcon icon="fa-solid fa-circle-xmark" /> Busy
            </ToggleButton>
            <ToggleButton
              id="call"
              type="radio"
              variant="outline-danger"
              name="call"
              value="3"
              checked={radioValue === "3"}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              <FontAwesomeIcon icon="fa-solid fa-phone" /> In A Call
            </ToggleButton>
            <ToggleButton
              id="break"
              type="radio"
              variant="outline-danger"
              name="break"
              value="4"
              checked={radioValue === "4"}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              <FontAwesomeIcon icon="fa-solid fa-mug-saucer" /> On A Break
            </ToggleButton>
            <ToggleButton
              id="away"
              type="radio"
              variant="outline-dark"
              name="away"
              value="5"
              checked={radioValue === "5"}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              <FontAwesomeIcon icon="fa-solid fa-moon" /> Away
            </ToggleButton>
          </ButtonGroup>
        </Container>
      </Card>
    </div>
  );
}
