import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { useAuth } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskOptions from "./TaskOptions";

export default function TaskCard(props) {
  const { teamMembers, currentUser } = useAuth();

  function findMember(user) {
    if (currentUser)
      return teamMembers.find((element) => element.id === user).data();
    else return "Unknown";
  }

  return (
    <div>
      <Card text="dark" className="shadow-sm mb-2">
        <Card.Body>
          <Row>
            <Col
              style={{
                textDecoration: props.status === "Complete" && "line-through",
              }}
            >
              <h4>
                <FontAwesomeIcon icon="fa-solid fa-pencil" /> {props.title}
              </h4>
              <p>{props.desc}</p>
              Assigned By:{" "}
              <Badge>
                {findMember(props.created).fname +
                  " " +
                  findMember(props.created).lname}
              </Badge>{" "}
              <br />
              Status: <Badge>{props.status}</Badge>
            </Col>
            <Col md="auto">
              <TaskOptions id={props.id} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
