import React from "react";
import {
  Card,
  Container,
  ButtonGroup,
  ToggleButton,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../contexts/AuthContext";

import StatusText from "./StatusText";

export default function Status() {
  const {
    currentUser,
    currentUserStatus,
    updateStatus,
    teamMembers,
    userPresence,
  } = useAuth();

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

  function findUserStatus(user) {
    if (userPresence && userPresence[user]) return userPresence[user].status;
    else return "Offline";
  }

  function getStatusStyling(status) {
    switch (status) {
      case "Available":
        return "success";
      case "On A Break":
        return "success";
      case "Busy":
        return "danger";
      case "In A Call":
        return "danger";
      default:
        return "dark";
    }
  }

  return (
    <div>
      <Card className="m-2">
        <Card.Body>
          <h2 className="text-center mb-4">Your Status</h2>

          <StatusText />
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
        <Container>
          <Card.Body>
            <Row xs={1} md={1} lg={2} className="g-2">
              {teamMembers.map((member) => (
                <Col key={`member-${member.id}`}>
                  <Card
                    bg={getStatusStyling(findUserStatus(member.id))}
                    text="light"
                    className="m-2"
                  >
                    <Card.Body>
                      <Card.Title className="text-center">
                        {member.data().fname} {member.data().lname}
                      </Card.Title>
                      <Card.Text className="text-center">
                        {findUserStatus(member.id)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Container>
      </Card>
    </div>
  );
}
