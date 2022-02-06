import React from "react";
import {
  Card,
  Container,
  ButtonGroup,
  ToggleButton,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../contexts/AuthContext";

import StatusText from "./StatusText";
import UserCard from "./UserCard";

export default function Status() {
  const { currentUser, currentUserStatus, updateStatus, teamMembers } =
    useAuth();

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
      <Card className="m-2">
        <Card.Body>
          <h2 className="text-center mb-2">
            Your <strong>Status</strong>
          </h2>
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
                <FontAwesomeIcon className="m-1" icon={status.icon} size="2x" />
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Container>
        <StatusText />
        <Container>
          <Card.Body>
            <Row xs={1} md={1} lg={1} className="g-2">
              {teamMembers.map((member) => (
                <UserCard
                  id={member.id}
                  key={member.id}
                  fname={member.data().fname}
                  lname={member.data().lname}
                  avatar={member.data().avatar}
                />
              ))}
            </Row>
          </Card.Body>
        </Container>
      </Card>
    </div>
  );
}
