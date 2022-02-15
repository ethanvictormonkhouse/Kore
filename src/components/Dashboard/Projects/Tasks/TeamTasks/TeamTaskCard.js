import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { useAuth } from "../../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TeamTaskButton from "./TeamTaskButton";

export default function TeamTaskCard(props) {
  const { findUser } = useAuth();

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
                {findUser(props.assigned).fname +
                  " " +
                  findUser(props.assigned).lname}
              </Badge>{" "}
            </Col>
            <Col md="auto">
              <TeamTaskButton {...props} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
