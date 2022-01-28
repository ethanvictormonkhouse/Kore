import React from "react";
import {
  Card,
  Container,
  ButtonGroup,
  ToggleButton,
  Button,
  CardGroup,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../contexts/AuthContext";
import { onDisconnect, ref, set, remove, get, child } from "firebase/database";
import { db, rtdb } from "../../../services/firebase";

export default function Status() {
  const {
    currentUser,
    currentUserStatus,
    teamData,
    updateStatus,
    teamMembers,
  } = useAuth();

  async function sortTeam() {
    teamMembers.forEach((member) => {});
  }

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
        <Container>
          <Card.Body>
            <Row xs={1} md={1} lg={2} className="g-2">
              {teamMembers.map((member) => (
                <Col>
                  <Card key={`member-${member.id}`} className="m-2">
                    <Card.Body>
                      <Card.Title className="text-center">
                        {member.data().fname} {member.data().lname}
                      </Card.Title>
                      <Card.Text className="text-center">Online</Card.Text>
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
