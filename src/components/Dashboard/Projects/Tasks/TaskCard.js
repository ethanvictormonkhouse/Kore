import React from "react";
import { Card, Col, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TaskCard(props) {
  return (
    <div>
      <Card text="dark" className="shadow-sm mb-2">
        <Col className="text-left d-flex align-items-center justify-content-left">
          <div>
            <Card.Body>
              <FontAwesomeIcon icon="fa-solid fa-pencil" /> {props.title}{" "}
              {props.desc}
              <br />
              <Badge>{props.created}</Badge>
            </Card.Body>
          </div>
        </Col>
      </Card>
    </div>
  );
}
