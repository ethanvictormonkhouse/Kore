import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { useAuth } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AppraisalCard(props) {
  const { findUser } = useAuth();

  return (
    <div>
      <Card
        border={props.type === "positive" ? "success" : "danger"}
        text="dark"
        className="shadow-sm mb-2"
      >
        <Card.Body>
          <Row>
            <Col>
              <FontAwesomeIcon
                icon={`fa-solid fa-${
                  props.type === "positive" ? "gift" : "comment-dots"
                }`}
              />{" "}
              <strong>{findUser(props.created).fname}</strong> gave you a{" "}
              {props.type === "positive" ? "reward" : "comment"}!{" "}
              <i>'{props.comment}'</i>
              <br />
              <Badge>{props.task}</Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
