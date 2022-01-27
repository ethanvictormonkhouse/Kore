import React from "react";
import { Card, Container, ButtonGroup, ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../contexts/AuthContext";

export default function Status() {
  const { currentUser, currentUserStatus, updateStatus } = useAuth();

  const statuses = [
    {
      name: "Available",
      variant: "outline-success",
      icon: "fa-solid fa-circle-check",
    },
    {
      name: "Busy",
      variant: "outline-danger",
      icon: "fa-solid fa-circle-xmark",
    },
    { name: "In A Call", variant: "outline-danger", icon: "fa-solid fa-phone" },
    {
      name: "On A Break",
      variant: "outline-success",
      icon: "fa-solid fa-mug-saucer",
    },
    { name: "Away", variant: "outline-dark", icon: "fa-solid fa-moon" },
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
            {statuses.map((status) => (
              <ToggleButton
                key={status.name}
                id={`status-${status.name}`}
                type="radio"
                variant={status.variant}
                value={status.name}
                checked={currentUserStatus.status === status.name}
                onChange={(e) =>
                  updateStatus(currentUser.uid, e.target.value, "")
                }
              >
                <FontAwesomeIcon icon={status.icon} /> {status.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Container>
      </Card>
    </div>
  );
}
