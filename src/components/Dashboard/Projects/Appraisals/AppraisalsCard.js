import React from "react";
import { Card, Row, Col, Badge, ButtonGroup, Button } from "react-bootstrap";
import { useAuth } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RoadblockCard(props) {
  const { teamMembers, currentUser } = useAuth();

  function findMember(user) {
    if (currentUser && teamMembers[1])
      return teamMembers.find((element) => element.id === user).data();
    else return "Unknown";
  }

  return (
    <div>
      <Card text="dark" className="shadow-sm mb-2">
        <Card.Body>
          <Row>
            <Col>
              <h5>
                <FontAwesomeIcon icon="fa-solid fa-clipboard-check" />{" "}
                {props.title}{" "}
              </h5>
              <Badge bg="success" text="light">
                {props.status}
              </Badge>{" "}
              <Badge>
                {findMember(props.assigned).fname +
                  " " +
                  findMember(props.assigned).lname}
              </Badge>{" "}
            </Col>
            <Col md="auto">
              <Button variant="secondary">
                <FontAwesomeIcon icon="fa-solid fa-comment" />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
