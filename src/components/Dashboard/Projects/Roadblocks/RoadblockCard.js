import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { useAuth } from "../../../../contexts/AuthContext";
import { auth } from "../../../../services/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RoadblockOptions from "./RoadblockOptions";

export default function RoadblockCard(props) {
  const { findUser } = useAuth();

  return (
    <div>
      <Card border="danger" text="dark" className="shadow-sm mb-2">
        {console.log(props)}
        <Card.Body>
          <Row>
            <Col>
              <h5 className="mb-3">
                <FontAwesomeIcon icon="fa-regular fa-face-sad-tear" />{" "}
                {props.issue}{" "}
                <Badge bg="warning" text="dark">
                  {props.status}
                </Badge>{" "}
                <Badge>
                  {findUser(props.created).fname +
                    " " +
                    findUser(props.created).lname}
                </Badge>{" "}
              </h5>
              {props.created === auth.currentUser.uid &&
              props.solution !== "No Current Solution" ? (
                <Card border="success">
                  <Card.Header>
                    Solution Received From{" "}
                    <strong>{findUser(props.solution_by).fname}</strong>
                  </Card.Header>
                  <Card.Body>
                    {findUser(props.solution_by).fname} said:{" "}
                    <i>{props.solution}</i>
                  </Card.Body>
                </Card>
              ) : (
                <p>
                  {findUser(props.created).fname} is having an issue with their
                  task to '<i>{props.title}</i>'
                </p>
              )}
            </Col>
            <Col md="auto">
              <RoadblockOptions {...props} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
