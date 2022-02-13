import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
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
                <FontAwesomeIcon icon="fa-regular fa-face-sad-tear" />{" "}
                {props.issue}{" "}
                <Badge bg="warning" text="dark">
                  {props.status}
                </Badge>{" "}
                <Badge>
                  {findMember(props.created).fname +
                    " " +
                    findMember(props.created).lname}
                </Badge>{" "}
              </h5>
              <p>
                {findMember(props.created).fname} is having an issue with their
                task to '<i>{props.title}</i>'
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
