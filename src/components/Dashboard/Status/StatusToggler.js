import React from "react";
import { Container, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StatusToggler() {
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
      <Container className="d-flex justify-content-center">
        <ButtonGroup className="shadow">
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
              <FontAwesomeIcon className="m-1" icon={status.icon} size="2x" />
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Container>
    </div>
  );
}
