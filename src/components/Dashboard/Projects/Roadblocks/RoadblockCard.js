import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { useAuth } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RoadblockCard(props) {
  const { findUser } = useAuth();

  return (
    <div>
      <Card text="dark" className="shadow-sm mb-2">
        <Card.Body>
          <Row>
            <Col>
              <h5>
                <FontAwesomeIcon icon="fa-regular fa-face-sad-tear" />{" "}
                {props.issue}{" "}
                <Badge bg="warning" text="dark">
                  {props.status}
                </Badge>{" "}
                {console.log(findUser(props.created))}
                <Badge>
                  {findUser(props.created).fname +
                    " " +
                    findUser(props.created).lname}
                </Badge>{" "}
              </h5>
              <p>
                {findUser(props.created).fname} is having an issue with their
                task to '<i>{props.title}</i>'
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
